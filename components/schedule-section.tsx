"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Schedule } from "@/sanity.types";

interface ScheduleSectionProps {
  schedule: Schedule;
}

export default function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(
    schedule.days?.[0]?.date || "",
  );

  const getEventTypeColor = (type: string | null | undefined) => {
    if (!type) {
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
    }

    switch (type) {
      case "keynote":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "talk":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "workshop":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "break":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "social":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200";
      default:
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
    }
  };

  const formatEventDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "EEEE, MMMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  if (!schedule.days || schedule.days.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No schedule available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          {schedule.days.map((day) => (
            <TabsTrigger
              key={day.date || "unknown"}
              value={day.date || "unknown"}
            >
              {formatEventDate(day.date)}
            </TabsTrigger>
          ))}
        </TabsList>

        {schedule.days.map((day) => (
          <TabsContent
            key={day.date || "unknown"}
            value={day.date || "unknown"}
            className="space-y-4"
          >
            {day.events?.map((event, index) => (
              <Card key={`${day.date}-${index}`} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gray-50 p-4 md:w-1/4 flex flex-col justify-center items-center md:items-start">
                      <div className="text-lg font-bold">{event.time}</div>
                      {event.location && (
                        <div className="text-sm text-gray-500">
                          {event.location}
                        </div>
                      )}
                      {event.type && (
                        <Badge
                          className={`mt-2 ${getEventTypeColor(event.type)}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 md:w-3/4">
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      {event.speaker && (
                        <p className="text-emerald-700 font-medium">
                          {event.speaker}
                        </p>
                      )}
                      {event.description && (
                        <p className="mt-2 text-gray-600">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
