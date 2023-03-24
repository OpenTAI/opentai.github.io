/// <reference types="react" />
import ProFormDatePickerMonth from './MonthPicker';
import ProFormDatePickerQuarter from './QuarterPicker';
import ProFormDatePickerWeek from './WeekPicker';
import ProFormDatePickerYear from './YearPicker';
declare const ExportComponent: import("react").FC<import("../..").ProFormItemProps<import("antd").DatePickerProps, any>> & {
    Week: typeof ProFormDatePickerWeek;
    Month: typeof ProFormDatePickerMonth;
    Quarter: typeof ProFormDatePickerQuarter;
    Year: typeof ProFormDatePickerYear;
};
export default ExportComponent;
