import { Empty, Typography } from "antd";
import notfound from "../../assets/notfound.svg";

export default function CustomEmpty() {
  return (
    <div className="custom-empty">
      <Empty
        className={"custom-empty__content"}
        image={notfound}
        styles={{ image: { height: 60 } }}
        description={
          <Typography.Text className="custom-empty__content--text">
            אין מטופלים להצגה
            <br />
            <Typography.Text
              type="secondary"
              className="custom-empty__content--text-sub"
            >
              נסה להקל מעט את הסינונים
            </Typography.Text>
          </Typography.Text>
        }
      ></Empty>
    </div>
  );
}
