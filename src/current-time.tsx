import { Detail, showHUD, ActionPanel, Action, Clipboard, getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";

interface Preferences {
  showDate: boolean;
  use12HourClock: boolean;
}

const preferences = getPreferenceValues<Preferences>();

function getAmsterdamTime() {
  const now = new Date();

  const time = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: preferences.use12HourClock,
  }).format(now);

  const date = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);

  return { time, date, hour: now.getUTCHours() };
}

export default function Command() {
  const [current, setCurrent] = useState(getAmsterdamTime());
  const [lastHour, setLastHour] = useState<number>(current.hour);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getAmsterdamTime();
      setCurrent(updated);

      if (updated.hour !== lastHour) {
        setLastHour(updated.hour);
        showHUD(`🔔 It's ${updated.time} in Amsterdam`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastHour]);

  const markdown = `
<div align="center">
  <h1>🕒 ${current.time}</h1>
  ${preferences.showDate ? `<h3>${current.date}</h3>` : ""}
  <p>🇳🇱 Amsterdam Time</p>
</div>
`;

  const clipboardContent = preferences.showDate
    ? `${current.date}, ${current.time}`
    : current.time;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action
            title="Copy to Clipboard"
            onAction={() => Clipboard.copy(clipboardContent)}
          />
        </ActionPanel>
      }
    />
  );
}
