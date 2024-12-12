import React, { useState, useEffect } from "react";
import type { TinaTemplate } from "tinacms";
import { PageBlocksTable, PageBlocksTableTable1, PageBlocksTableTable1ModelsRanking1RankingsPaper, PageBlocksTableTable2 } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { ConfigProvider, Table } from "antd";
import playIcon from "../../assets/img/playIcon.png";
import Image from "next/image";
import { basePath } from "../util/url-helper";

interface dataType {
  key: React.Key;
  name: string;
  paper: PageBlocksTableTable1ModelsRanking1RankingsPaper;
  download: number;
  datasetA: string;
  datasetB: string;
  ranking: string;
}

const columns = (columns: PageBlocksTableTable1 | PageBlocksTableTable2) => [
  {
    title: columns.columnName1,
    dataIndex: "name",
    key: "name",
  },
  {
    title: columns.columnName2,
    dataIndex: "paper",
    key: "paper",
    className: "w-96",
    render: (paper: PageBlocksTableTable1ModelsRanking1RankingsPaper) => (
      <a href={paper.link} className="text-base-blue underline cursor-pointer">{paper.text}</a>
    ),
  },
  {
    title: columns.columnName3,
    dataIndex: "download",
    key: "download",
    className: "w-32",
    sorter: (a: dataType, b: dataType) => a.name.length - b.name.length,
  },
  {
    title: columns.columnName4,
    className: "!text-center",
    children: [
      {
        title: columns.columnName4A,
        dataIndex: "datasetA",
        key: "datasetA",
        className: "!text-center",
      },
      {
        title: columns.columnName4B,
        dataIndex: "datasetB",
        key: "datasetB",
        className: "!text-center",
      },
    ],
  },
  {
    title: columns.columnName5,
    dataIndex: "ranking",
    key: "ranking",
    sorter: (a: dataType, b: dataType) => (+a.ranking || Number.MAX_SAFE_INTEGER) - (+b.ranking || Number.MAX_SAFE_INTEGER),
  },
];

export const Tables = ({
  data,
  language,
}: {
  data: PageBlocksTable;
  language: string;
}) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const [tableData, setTableData] = useState(null);

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "text-base text-sm [&>td]:!border-none";
    } else {
      return "bg-table-blue text-base text-sm [&>td]:!border-none";
    }
  };

  const getMenuItems = (tabIndex = 1) => {
    const items = data[`table${tabIndex}`][`modelsRanking${tabIndex}`]
      ? data[`table${tabIndex}`][`modelsRanking${tabIndex}`].map((i) => i.titleen)
      : [];

    setActiveMenuItems(items);
  };

  const handleActiveIndexChange = (index: number) => {
    setActiveIndex(index);
    getTableData(getTabIndex(activeTab), index);
  };

  const handleActiveTabChange = (tab: string) => {
    setActiveTab(tab);

    const tabIndex = getTabIndex(tab);
    getMenuItems(tabIndex);
    setActiveIndex(0);

    getTableData(tabIndex, 0);
  };

  const getTabIndex = (tab: string) => {
    return tab === "tab2" ? 2 : 1;
  };

  const getTableData = (tabIndex = 1, menuItemIndex = 0) => {
    const selectedData = data[`table${tabIndex}`][`modelsRanking${tabIndex}`]
      ? data[`table${tabIndex}`][`modelsRanking${tabIndex}`][menuItemIndex].rankings || []
      : [];
    const currentData = selectedData.map((item, index) => {
      return {
        key: index,
        name: item[`name${language}`],
        paper: item.paper,
        download: item.download,
        datasetA: item.datasetA,
        datasetB: item.datasetB,
        ranking: item.ranking,
      };
    });
    setTableData(currentData);
  };

  useEffect(() => {
    const params = new URL(location.href).searchParams;
    handleActiveTabChange(params.get("tab") || "tab1");
    getTableData();
  }, []);

  return (
    <div>
      <div className="bg-leaderboardsBg3 bg-cover bg-center h-[392px]">
        {data[`title${language}`] && (
          <div
            className="font-extralight text-6xl w-168 text-center mx-auto pt-12 leading-none"
            data-tina-field={tinaField(data, "titleen")}
          >
            {data[`title${language}`]}
          </div>
        )}
        {data[`subtitle${language}`] && (
          <div
            className="font-light text-lg w-208 text-center mx-auto mt-4 leading-7"
            data-tina-field={tinaField(data, "subtitleen")}
          >
            {data[`subtitle${language}`]}
          </div>
        )}
        {data[`buttonText${language}`] && (
          <div
            className="bg-white/30 border-base-blue border-2 w-[331px] h-[70px] mt-4 mx-auto text-base-blue font-semibold text-2xl flex items-center justify-center"
            data-tina-field={tinaField(data, "buttonTexten")}
          >
            <Image src={playIcon} className="w-8 mr-2" alt="" />
            {data[`buttonText${language}`]}
          </div>
        )}
      </div>

      <div className="flex border w-[34rem] font-bold mx-auto mt-14">
        <div
          className={`w-1/2 p-4 text-center cursor-pointer ${
            activeTab === "tab1" ? "bg-table-blue" : ""
          }`}
          onClick={() => handleActiveTabChange("tab1")}
        >
          {data.table1[`tab1${language}`]}
        </div>
        <div
          className={`w-1/2 p-4 text-center cursor-pointer border-l ${
            activeTab === "tab2" ? "bg-table-blue" : ""
          }`}
          onClick={() => handleActiveTabChange("tab2")}
        >
          {data.table2[`tab2${language}`]}
        </div>
      </div>

      <div className="flex justify-center mt-3 mb-24">
        <div className="w-48 bg-white pt-3 text-xs text-center font-bold border border-r-0">
          <ul>
            {activeMenuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleActiveIndexChange(index)}
                className={`p-2 cursor-pointer ${
                  activeIndex === index ? "bg-table-blue" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[70rem] bg-table-bg border border-[#DFE3E6]">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#f4faff",
                  headerColor: "#11181C",
                  headerSplitColor: "#F8F9FA",
                  cellPaddingBlock: 10,
                },
              },
            }}
          >
            <Table
              columns={columns(data[`table${getTabIndex(activeTab)}`])}
              dataSource={tableData}
              pagination={false}
              rowClassName={rowClassName}
              tableLayout="fixed"
              data-tina-field={tinaField(data)}
            />
          </ConfigProvider>
          {/* <div className="py-2 px-3 bg-[#ECEEF0] w-fit mt-4 mx-auto text-[#11181C] text-base font-semibold rounded-md cursor-pointer">
            Load more
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const tablesBlockSchema: TinaTemplate = {
  name: "table",
  label: "Table",
  ui: {
    previewSrc: `${basePath}/blocks/content.png`,
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title-En",
      name: "titleen",
    },
    {
      type: "string",
      label: "Title-Zh",
      name: "titlezh",
    },
    {
      type: "string",
      label: "Subtitle-En",
      name: "subtitleen",
    },
    {
      type: "string",
      label: "Subtitle-Zh",
      name: "subtitlezh",
    },
    {
      type: "string",
      label: "Button Text-En",
      name: "buttonTexten",
    },
    {
      type: "string",
      label: "Button Text-Zh",
      name: "buttonTextzh",
    },
    {
      type: "object",
      label: "Table 1",
      name: "table1",
      fields: [
        {
          type: "string",
          label: "Tab 1-En",
          name: "tab1en",
        },
        {
          type: "string",
          label: "Tab 1-Zh",
          name: "tab1zh",
        },
        {
          type: "string",
          label: "Column name 1",
          name: "columnName1",
        },
        {
          type: "string",
          label: "Column name 2",
          name: "columnName2",
        },
        {
          type: "string",
          label: "Column name 3",
          name: "columnName3",
        },
        {
          type: "string",
          label: "Column name 4",
          name: "columnName4",
        },
        {
          type: "string",
          label: "Column name 4 A",
          name: "columnName4A",
        },
        {
          type: "string",
          label: "Column name 4 B",
          name: "columnName4B",
        },
        {
          type: "string",
          label: "Column name 5",
          name: "columnName5",
        },
        {
          type: "object",
          label: "tab1",
          name: "modelsRanking1",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.titlezh };
            },
            defaultItem: {},
          },
          fields: [
            {
              type: "string",
              label: "titlezh",
              name: "titlezh",
            },
            {
              type: "string",
              label: "titleen",
              name: "titleen",
            },
            {
              type: "object",
              label: "Rankings",
              name: "rankings",
              list: true,
              ui: {
                itemProps: (ranking) => {
                  return { label: ranking?.nameen };
                },
                defaultItem: {
                  nameen: "Model Name",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Name-En",
                  name: "nameen",
                },
                {
                  type: "string",
                  label: "Name-Zh",
                  name: "namezh",
                },
                {
                  type: "object",
                  label: "Paper",
                  name: "paper",
                  fields: [
                    {
                      type: "string",
                      label: "Display Text",
                      name: "text"
                    },
                    {
                      type: "string",
                      label: "Link",
                      name: "link"
                    }
                  ]
                },
                {
                  type: "number",
                  label: "Download",
                  name: "download",
                },
                {
                  type: "string",
                  label: "DatasetA",
                  name: "datasetA",
                },
                {
                  type: "string",
                  label: "DatasetB",
                  name: "datasetB",
                },
                {
                  type: "string",
                  label: "Ranking",
                  name: "ranking",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Table 2",
      name: "table2",
      fields: [
        {
          type: "string",
          label: "Tab 2-En",
          name: "tab2en",
        },
        {
          type: "string",
          label: "Tab 2-Zh",
          name: "tab2zh",
        },
        {
          type: "string",
          label: "Column name 1",
          name: "columnName1",
        },
        {
          type: "string",
          label: "Column name 2",
          name: "columnName2",
        },
        {
          type: "string",
          label: "Column name 3",
          name: "columnName3",
        },
        {
          type: "string",
          label: "Column name 4",
          name: "columnName4",
        },
        {
          type: "string",
          label: "Column name 4 A",
          name: "columnName4A",
        },
        {
          type: "string",
          label: "Column name 4 B",
          name: "columnName4B",
        },
        {
          type: "string",
          label: "Column name 5",
          name: "columnName5",
        },
        {
          type: "object",
          label: "tab2",
          name: "modelsRanking2",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.titlezh };
            },
            defaultItem: {},
          },
          fields: [
            {
              type: "string",
              label: "titlezh",
              name: "titlezh",
            },
            {
              type: "string",
              label: "titleen",
              name: "titleen",
            },
            {
              type: "object",
              label: "Rankings",
              name: "rankings",
              list: true,
              ui: {
                itemProps: (ranking) => {
                  return { label: ranking?.nameen };
                },
                defaultItem: {
                  nameen: "Model Name",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Name-En",
                  name: "nameen",
                },
                {
                  type: "string",
                  label: "Name-Zh",
                  name: "namezh",
                },
                {
                  type: "object",
                  label: "Paper",
                  name: "paper",
                  fields: [
                    {
                      type: "string",
                      label: "Display Text",
                      name: "text"
                    },
                    {
                      type: "string",
                      label: "Link",
                      name: "link"
                    }
                  ]
                },
                {
                  type: "number",
                  label: "Download",
                  name: "download",
                },
                {
                  type: "string",
                  label: "DatasetA",
                  name: "datasetA",
                },
                {
                  type: "string",
                  label: "DatasetB",
                  name: "datasetB",
                },
                {
                  type: "string",
                  label: "Ranking",
                  name: "ranking",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
