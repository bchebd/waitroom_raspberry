import classNames from "classnames/bind";

import styles from "@/components/TicketTable/TicketTable.module.scss";
import { useTicketTable } from "@/components/TicketTable/TicketTable.hooks";
import { Loader } from "@/components/Loader/Loader";
import { ModalPortal } from "../ModalPortal/ModalPortal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/ui/Button/Button";

const cn = classNames.bind(styles);

export const TicketTable = () => {
    const {
        sliced,
        tags,
        isLoadingT,
        isLoadingU,
        isErrorT,
        isErrorU,
        errorT,
        errorU
    } = useTicketTable();

    return (
         <>
            <section className={cn("admin-table")}>
                <div>
                    {
                        (tags !== undefined && tags?.length > 0) ?
                        (
                            <h1>
                                Aktuelle Ticket: <span>{tags !== undefined && tags?.length > 0 ? tags[0].id : ""}</span>
                            </h1>
                        ) : 
                        ""
                    }

                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Student</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sliced}
                        </tbody>
                    </table>

                    {
                        (tags === undefined || tags?.length === 0) ?
                        (
                            <h1 className={cn("notfound")}>
                                Noch kein Ticket vorhanden
                            </h1>
                        ) : 
                        ""
                    }
                </div>
            </section>
            {
                (isLoadingT || isLoadingU) && <Loader />
            }
            {
                (isErrorT || isErrorU) && (() => {
                    const { status, message } = getErrorMessage(errorT || errorU);


                    return (
                         <ModalPortal isOpen={true}>
                            <div className={cn("modal__container__header")}>
                                Fehler: {status}
                            </div>

                            <div className={cn("modal__container__body")}>
                                {message}
                            </div>

                            <div className={cn("modal__container__footer")}>
                                <Button onClick={() => window.location.reload()}>
                                    Ok
                                </Button>
                            </div>
                        </ModalPortal>
                    );
                })()
            }
        </>
    )
}