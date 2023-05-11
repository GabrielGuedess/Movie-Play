import React, { useEffect, useState } from 'react';

import { TextInputProps } from 'react-native';

import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';

import { MagnifyingGlass } from 'phosphor-react-native';

import { useTheme } from 'styled-components';

import Mic from 'assets/svg/mic.svg';

import * as S from './styles';

export function Search({ ...props }: TextInputProps) {
  const [start, setStart] = useState(false);
  const [results, setResults] = useState<string[] | undefined>([]);

  const { colors } = useTheme();

  const handleStartSpeechToText = async () => {
    await Voice.start('pt-BR');

    setStart(true);
  };

  const handleStopSpeech = async () => {
    await Voice.stop();

    setStart(false);
  };

  const onSpeechResults = async (result: SpeechResultsEvent) => {
    setResults(result.value);
  };

  const onSpeechError = async (error: SpeechErrorEvent) => {
    console.error(error);
  };

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <S.Container>
      <S.IconSearchWrapper>
        <MagnifyingGlass size={24} color={colors.text} weight="bold" />
      </S.IconSearchWrapper>

      <S.Search value={results?.join(' ')} {...props} />

      <S.IconMicWrapper
        onPress={start ? handleStopSpeech : handleStartSpeechToText}
      >
        <Mic
          width={24}
          height={24}
          color={start ? colors.main : colors.border}
        />
      </S.IconMicWrapper>
    </S.Container>
  );
}
