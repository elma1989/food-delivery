import { Market } from "./market.js";
import { User } from "./user.js";

const currentUser = new User();
const market = new Market();

market.renderNav(currentUser);
market.addNavEvents(currentUser);
market.renderMain(currentUser);