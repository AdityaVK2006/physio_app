import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import YoutubePlayer from 'react-native-youtube-iframe';

const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const ExerciseVideoPlayer = ({ videoUrl, style }: { videoUrl: string, style: any }) => {
    const youtubeId = getYouTubeID(videoUrl);

    if (youtubeId) {
        return (
            <View style={style}>
                <YoutubePlayer
                    height={style.height || 250}
                    play={true}
                    videoId={youtubeId}
                />
            </View>
        );
    }

    const player = useVideoPlayer(videoUrl, player => {
        player.loop = true;
        player.play();
    });

    return (
        <VideoView
            player={player}
            style={style}
            contentFit="cover"
            nativeControls={true}
        />
    );
};
