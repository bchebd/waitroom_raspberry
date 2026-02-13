import type { FC } from "react";
import { TicketTable } from "./components/TicketTable/TicketTable";

const App: FC = () => {
	return (
		<>
			<main>
				<TicketTable />
			</main>
		</>
	);
};

export default App;
