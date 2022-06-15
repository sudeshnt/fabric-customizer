import { Tabs } from "antd";
import { ControlsContainer } from "./styles";
import ImageControls from "./ImageControls";
import TextControls from "./TextControls";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;
export enum ObjectType {
  Image = "Image",
  Text = "Text",
}

export const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState<ObjectType>(ObjectType.Image);
  const selectedObject = useSelector(
    (state: RootState) => state.customize.selectedObject
  );

  useEffect(() => {
    const objectType = selectedObject?.data?.type;
    if (objectType) {
      const active = objectType === "Text" ? ObjectType.Text : ObjectType.Image;
      setActiveTab(active);
    }
  }, [selectedObject]);

  return (
    <ControlsContainer>
      <Tabs
        activeKey={activeTab}
        type="card"
        onChange={(key: any) => {
          setActiveTab(key);
        }}
      >
        <TabPane tab="Image" key={ObjectType.Image}>
          <ImageControls />
        </TabPane>
        <TabPane tab="Text" key={ObjectType.Text}>
          <TextControls />
        </TabPane>
      </Tabs>
    </ControlsContainer>
  );
};

export default ControlPanel;
