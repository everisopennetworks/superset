import { DataRecord } from '@superset-ui/core';
import { AlarmTableChartTransformedProps } from './types';
import { DataTableProps } from './DataTable';
export default function AlarmTableChart<D extends DataRecord = DataRecord>(props: AlarmTableChartTransformedProps<D> & {
    sticky?: DataTableProps<D>['sticky'];
}): JSX.Element;
//# sourceMappingURL=AlarmTableChart.d.ts.map