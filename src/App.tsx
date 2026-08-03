import { Controls } from "./components/controls";
import { InfoBlock } from "./components/info-block";
import { ListItems } from "./components/list-items";

import "./App.scss";

function App() {
  return (
    <section className="app">
      <div className="app__container" data-testid="app-container">
        <InfoBlock />
        <ListItems />
        <Controls />
      </div>
    </section>
  );
}

export default App;
