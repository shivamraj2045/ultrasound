'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { videosData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, Clock } from 'lucide-react';
import type { Video } from '@/lib/types';
import { Badge } from '@/components/ui/badge';


const VideoCard = ({ video }: { video: Video }) => {
    const placeholder = PlaceHolderImages.find(p => p.id === video.thumbnailUrl);
    return (
        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block group">
            <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0">
                    {placeholder && (
                        <div className="aspect-video relative overflow-hidden">
                            <Image
                                src={placeholder.imageUrl}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={placeholder.imageHint}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <PlayCircle className="w-16 h-16 text-white/80 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                            </div>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-lg leading-tight mb-2">{video.title}</CardTitle>
                    <CardDescription className="text-sm">{video.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                    <Badge variant="outline">{video.type}</Badge>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                    </div>
                </CardFooter>
            </Card>
        </a>
    );
};
  
const VideosPage = () => {
    const trainingVideos = videosData.filter((v) => v.type === 'Training');
    const recordedScans = videosData.filter((v) => v.type === 'Recorded');
    const educationalVideos = videosData.filter((v) => v.type === 'Educational');

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
                <p className="text-muted-foreground mt-1">Training videos and recorded scans for professional development</p>
            </div>
      
            <Tabs defaultValue="training">
                <TabsList>
                    <TabsTrigger value="training">Training Videos</TabsTrigger>
                    <TabsTrigger value="recorded">Recorded Scans</TabsTrigger>
                    <TabsTrigger value="educational">Educational</TabsTrigger>
                </TabsList>
                <TabsContent value="training" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trainingVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="recorded" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recordedScans.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="educational" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {educationalVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default VideosPage;
