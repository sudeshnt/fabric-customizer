import "./App.css";
import Canvas from "./Components/Canvas";
import ControlPanel from "./Components/Controls";
import { Col, Row } from "antd";

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={18}>
          <Canvas />
        </Col>
        <Col span={6}>
          <ControlPanel />
        </Col>
      </Row>
    </div>
  );
}

export default App;
