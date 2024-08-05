import { useEffect, useMemo, useState } from "react";

// third party
import { useToggle } from "ahooks";
import constate from "constate";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// material-ui
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { useGetTicketQuery, useGetTicketsQuery, useReplyTicketMutation } from "@/store/services/api";
import useQuery from "@/hooks/useQuery";
import Ticket from "@/model/ticket";

export interface useTicketProps {
  id?: number;
}

const useTicket = ({ id }: useTicketProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const query = useQuery();
  const navigate = useNavigate();

  const [drawerOpen, drawerActions] = useToggle(false);
  const [currentId, setCurrentId] = useState<number>(id ?? 0);
  const [search, setSearch] = useState<string>(query.get("s") ?? "");
  const [messageInput, setMessageInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isMobile) {
      drawerActions.set(true);
    }
  }, [isMobile]);

  const drawerWidth = useMemo(() => (isMobile ? 280 : 320), [isMobile]);

  const ticketsQuery = useGetTicketsQuery(undefined, {
    pollingInterval: 1000 * 60
  });
  const ticketQuery = useGetTicketQuery(currentId, {
    skip: currentId === 0,
    pollingInterval: 1000 * 30
  });
  const [replyTicketMessage] = useReplyTicketMutation();

  useEffect(() => {
    if (currentId) {
      setMessageInput("");
      setErrorMessage(null);
    }
  }, [currentId]);

  useEffect(() => {
    if (ticketsQuery.data && (ticketsQuery.data?.length ?? 0) > 0 && !currentId) {
      setCurrentId(ticketsQuery.data[0].id);
      navigate(`/ticket/${ticketsQuery.data[0].id}`);
    }
  }, [ticketsQuery.data]);

  const handleOnSend = async () => {
    if (messageInput.trim() === "") {
      enqueueSnackbar(
        t("notice::send-message", {
          context: "empty"
        }),
        {
          variant: "warning"
        }
      );
      return;
    }

    try {
      await replyTicketMessage({
        id: currentId,
        message: messageInput
      }).unwrap();
      enqueueSnackbar(t("notice::send-message", { context: "success" }), { variant: "success" });
      setMessageInput("");
      setErrorMessage(null);
    } catch (error: any) {
      console.error("error sending message", error);
      enqueueSnackbar(t("notice::send-message", { context: "failed" }), { variant: "error" });
      setErrorMessage(error.message);
    }
  };

  const tickets = useMemo(
    () =>
      ticketsQuery.data?.filter((row) => {
        let matches = true;

        const properties: (keyof Omit<Ticket, "message">)[] = ["subject"];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(search.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      }) ?? [],
    [ticketsQuery.data, search]
  );

  return {
    tickets,
    ticketsQuery,
    ticketQuery,
    currentId,
    setCurrentId,
    drawerOpen,
    drawerActions,
    drawerWidth,
    search,
    setSearch,
    messageInput,
    setMessageInput,
    handleOnSend,
    errorMessage
  };
};

const [TicketProvider, useTicketContext] = constate(useTicket);

export { TicketProvider, useTicketContext };
