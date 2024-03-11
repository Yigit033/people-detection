"use client";

import ModeToggle from "@/components/theme-toogle";
import { Button } from "@/components/ui/button";
import { beep } from "@/utils/audio";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { FlipHorizontal, Camera, Video, Volume2, PersonStanding } from "lucide-react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Rings } from "react-loader-spinner";
import { toast } from "sonner";

type Props = {};

function Home(props: Props) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Insanların değiştirebilmesi için
  const [mirrored, setmirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.1);

  return (
    <div className="flex h-screen">
      {/* // Left-side canvas and webcam */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam mirrored={mirrored} ref={webcamRef} className="h-full w-full object-contain p-2" />
          <canvas ref={canvasRef} className="absulute top-h left-0 h-full w-full object-contain "></canvas>
        </div>
      </div>
      {/* // Right-side buttons and settings */}
      <div className="flex flex-row flex-1">
        <div className=" border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4 ">
          {/* // Top Section */}
          <div className="flex flex-col gap-2">
            <Separator />
            <Button
              variant="ghost"
              className="p-2 bg-primary/5 hover:bg-primary/10 rounded-md"
              onClick={() => {
                setmirrored((prev) => !prev);
              }}
            >
              <FlipHorizontal />
            </Button>
            <ModeToggle />
          </div>
          {/* Middle section  */}
          <div className="flex flex-col gap-2">
            <Button variant={"outline"} size={"icon"} onClick={userPromptScreenshot}>
              <Camera />
            </Button>

            <Separator className="my-2" />

            <Button variant={isRecording ? "destructive" : "outline"} size={"icon"} onClick={userPromptRecord}>
              <Video />
            </Button>
            <Separator className="my-2" />
            <Button variant={autoRecordEnabled ? "destructive" : "outline"} size={"icon"} onClick={toggleAutoRecord}>
              {autoRecordEnabled ? <Rings color="white" height={45} /> : <PersonStanding />}
            </Button>
          </div>
          {/* Bottom Secion  */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider
                  max={1}
                  min={0}
                  step={0.01}
                  defaultValue={[volume]}
                  onValueCommit={(val) => {
                    setVolume(val[0]);
                    beep(val[0]);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {/* // for wiki section */}
        <div className="h-full flex-l py-4 px-2 overflow-y-scroll">
          <RenderFeatureHighlightsSe1ction />
        </div>
      </div>
    </div>
  );

  function userPromptScreenshot() {
    // take picture
    //save it to download
  }

  function userPromptRecord() {
    if (isRecording) {
      setIsRecording(false);
      toast("basma artık çalışmıyorum, görmüyor musun!");
    } else {
      setIsRecording(true);
      toast("şaka yaptım basabilirsin");
    }
    // check if recording
    // then stop redcording
    // and save to downloads
    // if not recording
    // start recording
  }

  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      setAutoRecordEnabled(false);
      toast("Autorecord is NOT enabled now ");
    } else {
      setAutoRecordEnabled(true);
      toast("Autorecord is enabled now ");
    }
  }
}

function RenderFeatureHighlightsSe1ction() {
  return <div className="">HEllo Hello</div>;
}

export default Home;
