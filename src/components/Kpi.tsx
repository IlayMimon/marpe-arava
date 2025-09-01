import { JSX } from "react";
import { Tooltip } from "antd";

interface KpiProps {
  title: string;
  icon?: JSX.Element;
  value: number | string | undefined;
  titleColor?: string;
  borderColor?: string;
}

const Kpi = ({ title, icon, value, titleColor, borderColor }: KpiProps) => {
  return (
    <div className="kpi">
      {icon ? (
        <Tooltip title={title}>{icon}</Tooltip>
      ) : (
        <span
          className="kpi__title"
          style={{
            color: `var(${titleColor})`,
            borderColor: `var(${borderColor})`,
          }}
        >
          {title}
        </span>
      )}
      <div
        className="kpi__value"
        style={
          value === 0 ? { color: "var(--Text-color-text-tertiary)" } : undefined
        }
      >
        {value} {/* is this an ok change ? looks like its working fine */}
      </div>
    </div>
  );
};

export default Kpi;
