import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { ListItemIcon, ListItemText, Typography } from "@mui/material";
import { DataGrid as MuiDataGrid, DataGridProps, GridHeader, GridLocaleText } from "@mui/x-data-grid";
import { GridValidRowModel } from "@mui/x-data-grid/models/gridRows";

// assets
import { CloseCircleFilled, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

type MyDataGridProps<R extends GridValidRowModel = any> = DataGridProps<R> & React.RefAttributes<HTMLDivElement>;

const DataGrid: React.FC<MyDataGridProps> = ({ localeText, ...props }) => {
  const { t } = useTranslation();

  const defaultLocaleText = useMemo<Partial<GridLocaleText>>(
    () => ({
      noRowsLabel: t("general::dataGrid.no_rows").toString(),
      columnMenuSortAsc: (
        <>
          <ListItemIcon>
            <SortAscendingOutlined />
          </ListItemIcon>
          <ListItemText>{t("general::dataGrid.sort", { context: "asc" }).toString()}</ListItemText>
        </>
      ),
      columnMenuSortDesc: (
        <>
          <ListItemIcon>
            <SortDescendingOutlined />
          </ListItemIcon>
          <ListItemText>{t("general::dataGrid.sort", { context: "desc" }).toString()}</ListItemText>
        </>
      ),
      columnMenuUnsort: (
        <>
          <ListItemIcon>
            <CloseCircleFilled />
          </ListItemIcon>
          <ListItemText>{t("general::dataGrid.unsort").toString()}</ListItemText>
        </>
      ),
      columnMenuFilter: (
        <>
          <ListItemIcon>
            <FilterOutlined />
          </ListItemIcon>
          <ListItemText>{t("general::dataGrid.filter").toString()}</ListItemText>
        </>
      ),
      columnMenuHideColumn: t("general::dataGrid.hide_column").toString(),
      columnMenuShowColumns: t("general::dataGrid.show_column").toString(),
      MuiTablePagination: {
        labelDisplayedRows: ({ from, to, count }) => t("general::dataGrid.pagination", { from, to, count }).toString(),
        labelRowsPerPage: t("general::dataGrid.rows_per_page").toString()
      },
      filterPanelColumns: t("general::dataGrid.filter_panel_columns").toString(),
      filterPanelOperators: t("general::dataGrid.filter_panel_operators").toString(),
      filterPanelInputLabel: t("general::dataGrid.filter_panel_values").toString(),
      filterOperatorIs: t("general::dataGrid.filter_operator.is").toString(),
      filterOperatorNot: t("general::dataGrid.filter_operator.not").toString(),
      filterOperatorAfter: t("general::dataGrid.filter_operator.after").toString(),
      filterOperatorOnOrAfter: t("general::dataGrid.filter_operator.on_or_after").toString(),
      filterOperatorAfterOrEqual: t("general::dataGrid.filter_operator.after_or_equal").toString(),
      filterOperatorBefore: t("general::dataGrid.filter_operator.before").toString(),
      filterOperatorOnOrBefore: t("general::dataGrid.filter_operator.on_or_before").toString(),
      filterOperatorIsEmpty: t("general::dataGrid.filter_operator.is_empty").toString(),
      filterOperatorIsNotEmpty: t("general::dataGrid.filter_operator.is_not_empty").toString(),
      filterOperatorContains: t("general::dataGrid.filter_operator.contains").toString(),
      filterOperatorDoesNotContain: t("general::dataGrid.filter_operator.does_not_contain").toString(),
      filterOperatorStartsWith: t("general::dataGrid.filter_operator.starts_with").toString(),
      filterOperatorEndsWith: t("general::dataGrid.filter_operator.ends_with").toString(),
      filterOperatorHas: t("general::dataGrid.filter_operator.has").toString(),
      filterOperatorHasNot: t("general::dataGrid.filter_operator.has_not").toString(),
      filterOperatorAnd: t("general::dataGrid.filter_operator.and").toString(),
      filterOperatorOr: t("general::dataGrid.filter_operator.or").toString(),
      filterOperatorAdd: t("general::dataGrid.filter_operator.add").toString(),
      filterOperatorRemove: t("general::dataGrid.filter_operator.remove").toString(),
      filterOperatorEquals: t("general::dataGrid.filter_operator.equals").toString(),
      filterOperatorNotEquals: t("general::dataGrid.filter_operator.not_equals").toString(),
      filterOperatorNoFilter: t("general::dataGrid.filter_operator.no_filter").toString(),
      filterOperatorCustom: t("general::dataGrid.filter_operator.custom").toString(),
      filterOperatorBetween: t("general::dataGrid.filter_operator.between").toString(),
      filterOperatorNotBetween: t("general::dataGrid.filter_operator.not_between").toString(),
      filterOperatorIsAnyOf: t("general::dataGrid.filter_operator.is_any_of").toString(),
      footerRowSelected: (count) => t("general::dataGrid.footer_row_selected", { count }).toString()
    }),
    [t]
  );

  return (
    <MuiDataGrid
      localeText={Object.assign(defaultLocaleText, localeText)}
      logLevel={import.meta.env.DEV ? "debug" : "error"}
      columnBuffer={2}
      columnThreshold={2}
      {...props}
    />
  );
};

export default DataGrid;
