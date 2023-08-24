import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export function PreprocessingTabs(props) {
    return (
        <Tabs.Group aria-label="Default tabs" style="default">
            <Tabs.Item active className="text-dark" title="Dataset">
                {props.Dataset}
            </Tabs.Item>
            <Tabs.Item className="text-dark" title="Preproceesing">
                {props.preprocessing}
            </Tabs.Item>
            {/* <Tabs.Item className="text-dark" title="Training Clasifikasi">
                {props.train}
            </Tabs.Item> */}
        </Tabs.Group>
    );
}

export function DTables(props) {
    return (
        <Tabs.Group aria-label="Default tabs" style="default">
            <Tabs.Item className="text-dark" active title="Data Train">
                {props.dTrain}
            </Tabs.Item>
            {/* <Tabs.Item className="text-dark" title="Data Test">
                {props.dTest}
            </Tabs.Item> */}
        </Tabs.Group>
    );
}
