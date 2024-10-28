import { Table } from "antd";
import type { TableProps } from "antd";
import useCategories from "../../../hooks/useCategories";

interface CollectionDataType {
  name: string;
  category: "History" | "sculpture" | "photography";
  year: number;
  location: string;
  conservationState: string;
}

function CollectionInventoryScreen() {
  const { categories } = useCategories();
  const tableKeys: TableProps<CollectionDataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "year",
      dataIndex: "year",
      key: "year",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "conservationState",
      dataIndex: "conservationState",
      key: "conservationState",
      render: (text) => <a>{text}</a>,
    },
  ];
  const data: CollectionDataType[] = [
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
    {
      name: "adsadas",
      category: "History",
      year: 1515,
      location: "museo",
      conservationState: "broken",
    },
  ];
  return (
    <>
      <select name="" id="">
        {categories.map((category) => (
          <option key={category.categoryId}>{category.category}</option>
        ))}
      </select>
      <Table columns={tableKeys} dataSource={data} />
    </>
  );
}

export default CollectionInventoryScreen;
