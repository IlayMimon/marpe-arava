import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import Table from "./Table/Table";
import useGetTableData from "../hooks/useGetTableData";
import useGetTableColumns from "../hooks/useGetTableColumns";

const HomeScreenBody = () => {
  const [isShattlesArranged, setIsShattlesArranged] = useState(false);

  const data = useGetTableData()
  const columns = useGetTableColumns()

  return (
    <div className="home-screen-body">
      <div className="home-screen-body__header">
        <div className="home-screen-body__header__right">
          <h1>שאטלים</h1>
        </div>
        <div className="home-screen-body__header__left">
          <Button
            color="default"
            variant="filled"
            icon={<IconSparkles />}
            className="home-screen-body__header__left__button"
          >
            שבץ נסיעות
          </Button>
          <Tooltip title={isShattlesArranged ? undefined : "נדרש לשבץ נסיעות"}>
            <Button
              disabled
              color="default"
              variant="filled"
              icon={<IconSend />}
              className="home-screen-body__header__left__button"
            >
              שליחת הודעות
            </Button>
          </Tooltip>
          <Button
            color="default"
            variant="solid"
            icon={<TbPlus />}
            className="home-screen-body__header__left__button"
          >
            הוספת מטופל
          </Button>
        </div>
      </div>
      <Table
        data={data}
        columns={columns}
        groupBy={(row) => row.area}
        rowKey={(row) => row.key}
      />
    </div>
  );
};

export default HomeScreenBody;
