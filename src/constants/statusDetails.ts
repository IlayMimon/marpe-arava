import { AssignedStatusEnum, StatusDetails } from "../types/status";

export const statusDetails: Record<keyof typeof AssignedStatusEnum, StatusDetails> = {
    initial: {
        singularTitle: "טרם שובץ",
        pluralTitle: "טרם שובצו",
        titleColor: "var(--Colors-orange-6)",
        borderColor: "var(--Colors-orange-3)",
    },
    assigned: {
        singularTitle: "שובץ",
        pluralTitle: "שובצו",
        titleColor: "var(--Colors-purple-6)",
        borderColor: "var(--Colors-purple-3)",
    },
    messageSent: {
        singularTitle: "נשלחה הודעה",
        pluralTitle: "נשלחה הודעה",
        titleColor: "var(--Colors-green-6)",
        borderColor: "var(--Colors-green-3)",
    },
    arrivingSoon: {
        singularTitle: "מגיע בקרוב",
        pluralTitle: "מגיעים בקרוב",
        titleColor: "var(--Colors-cyan-6)",
        borderColor: "var(--Colors-cyan-3)",
    },
    inClinic: {
        singularTitle: "במרפאה",
        pluralTitle: "במרפאה",
        titleColor: "var(--Colors-green-6)",
        borderColor: "var(--Colors-green-3)",
    },
    finishingSoon: {
        singularTitle: "מסיים בקרוב",
        pluralTitle: "מסיימים בקרוב",
        titleColor: "var(--Colors-geekblue-6)",
        borderColor: "var(--Colors-geekblue-3)",
    },
    waitingToReturn: {
        singularTitle: "ממתין לחזור",
        pluralTitle: "ממתינים לחזור",
        titleColor: "var(--Colors-orange-6)",
        borderColor: "var(--Colors-orange-3)",
    },
    done: {
        singularTitle: "חזר",
        pluralTitle: "חזרו",
        titleColor: "var(--Colors-green-6)",
        borderColor: "var(--Colors-green-3)",
    },
};