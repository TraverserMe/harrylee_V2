type state = "waiting" | "thinking" | "ready";

export type Player = {
    id: string;
    name: string;
    status: state;
    score: number;
    image?: string;
    choice?: "rock" | "paper" | "scissors";
};