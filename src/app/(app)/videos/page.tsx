'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { videosData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, Clock } from 'lucide-react';
import type { Video } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';


const VideoCard = ({ video, onVideoSelect }: { video: Video; onVideoSelect: (video: Video) => void; }) => {
    const { toast } = useToast();
    const placeholder = PlaceHolderImages.find(p => p.id === video.thumbnailUrl);

    const handleClick = () => {
        if (video.type === 'Training' || !video.youtubeUrl) {
            toast({
                title: 'Video Not Available',
                description: 'There is no video linked for this training module yet.',
            });
        } else {
            onVideoSelect(video);
        }
    };

    return (
        <div onClick={handleClick} className="block group cursor-pointer">
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
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayCircle className="w-16 h-16 text-white/80" />
                            </div>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{video.title}</CardTitle>
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
        </div>
    );
};
  
const VideosPage = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const trainingVideos = videosData.filter((v) => v.type === 'Training');
    const educationalVideos = videosData.filter((v) => v.type === 'Educational');

    const getYouTubeVideoId = (url: string): string | null => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    const videoId = selectedVideo ? getYouTubeVideoId(selectedVideo.youtubeUrl) : null;

    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
                    <p className="text-muted-foreground mt-1">Educational and training videos for professional development</p>
                </div>
      
                <Tabs defaultValue="educational">
                    <TabsList>
                        <TabsTrigger value="educational">Educational</TabsTrigger>
                        <TabsTrigger value="training">Training Videos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="educational" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {educationalVideos.map((video) => (
                                <VideoCard key={video.id} video={video} onVideoSelect={setSelectedVideo} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="training" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {trainingVideos.map((video) => (
                                <VideoCard key={video.id} video={video} onVideoSelect={setSelectedVideo} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0 border-0 bg-transparent shadow-none">
                    {videoId && (
                        <div className="aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title={selectedVideo?.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                            ></iframe>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default VideosPage;
