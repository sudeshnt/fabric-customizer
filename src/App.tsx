import "./App.css";
import Canvas from "./Components/Canvas";
import ControlPanel from "./Components/Controls";
import { Col, Row } from "antd";

function App() {
  return (
    <div className="App">
      <Row className="Content">
        <Col span={16}>
          <Canvas />
        </Col>
        <Col span={8}>
          <ControlPanel />
        </Col>
      </Row>
    </div>
  );
}

export default App;
