'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { videosData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const VideosPage = () => {
  const trainingVideos = videosData.filter((v) => v.type === 'Training');
  const recordedScans = videosData.filter((v) => v.type === 'Recorded');

  const VideoCard = ({ video }: { video: typeof videosData[0] }) => {
    const placeholder = PlaceHolderImages.find(p => p.id === video.thumbnailUrl);
    return (
        <Card className="overflow-hidden">
            {placeholder && (
                 <div className="aspect-video relative">
                    <Image
                        src={placeholder.imageUrl}
                        alt={video.title}
                        fill
                        className="object-cover"
                        data-ai-hint={placeholder.imageHint}
                    />
                 </div>
            )}
            <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
            </CardHeader>
        </Card>
    );
  };
  
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Training Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recorded Scans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordedScans.map((video) => (
             <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
