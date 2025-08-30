/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Joyride, { Step } from 'react-joyride';


const STORAGE_KEY = "isTourCompleted";

const steps: Step[] = [
    { target: ".mode-toggle", content: "Toggle light / dark theme." },
    { target: ".profile-sec", content: "Form here you can go to profile setting to change profile related things" },
    { target: ".dashboard-tour", content: "Quick wallet snapshot here." },
    { target: ".transactions-tour", content: "Search/filter transactions." },
    { target: ".profile-tour", content: "Update profile and restart tour" },
];

const TourGuide = () => {
    const [run, setRun] = useState(false);

    useEffect(() => {
        const done = localStorage.getItem(STORAGE_KEY);
        if (!done) setRun(true); 
    }, []);

    const handleCallback = (data: any) => {
        const { status } = data;
        if (status === "finished" || status === "skipped") {
            localStorage.setItem(STORAGE_KEY, "true");
            setRun(false);
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showSkipButton
            showProgress
            callback={handleCallback}
            styles={{
                options: { zIndex: 10000, primaryColor: "#2B7FFF" },
            }}
        />
    );
};

export default TourGuide;