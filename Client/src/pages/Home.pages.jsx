import "../App.css";
import { Helmet } from "react-helmet";

export function HomePage() {
  return (
    <div>
      <Helmet>
        <title>BTD6 Index</title>
      </Helmet>
      <h1>HOME</h1>
      <h2>TO-DO</h2>
        <ul>
          <li>Edit combos on helper page</li>
          <li>Stats Pages for 2tcc</li>
          <li>ltc page</li>
          <li>This Home Page</li>
          <li>{`Colors for alts pages (fix)`}</li>
          <li>Waterless maps for alts pages</li>
          <li>difficulty coloring toggle on lcd and lcc</li>
          <li>maybe on hover show all beg/ind/adv/exp/maps for alts pages</li>
        </ul>
    </div>
  );
}
