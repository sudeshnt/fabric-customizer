import { Tabs, Button } from "antd";
import { ControlsContainer } from "./styles";
import ImageControls from "./ImageControls";
import TextControls from "./TextControls";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

export const ControlPanel = () => {
  const state = useSelector((state) => state);
  return (
    <ControlsContainer>
      <Tabs type="card">
        <TabPane tab="Image" key="1">
          <ImageControls />
        </TabPane>
        <TabPane tab="Text" key="2">
          <TextControls />
        </TabPane>
      </Tabs>
    </ControlsContainer>
  );
};

export default ControlPanel;
