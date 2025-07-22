interface Status {
    step: number;
    CompletionStatus: "Failed" | "InProgress" | "Completed";
}

export default Status;