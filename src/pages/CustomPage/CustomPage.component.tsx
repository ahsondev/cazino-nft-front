import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import Layout from '../../components/Layout';
import Page404 from '../Page404';

const defaultLanguage = 'en';

interface Props extends RouteComponentProps {
  fileName: string;
  raw?: boolean;
}

export const CustomPageComponent: React.FC<Props> = ({ fileName, raw }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [error, setError] = useState<boolean>(false);
  const [text, setText] = useState<string | null>('');

  const content = useMemo(() => <ReactMarkdown>{text || ''}</ReactMarkdown>, [text]);

  useEffect(() => {
    try {
      if (!fileName) {
        setError(true);
        return;
      }
      setError(false);
      const file =
        require(`./pages/${fileName}/${language}.md`).default ||
        require(`./pages/${fileName}/${defaultLanguage}.md`).default;

      fetch(file)
        .then(res => res.text())
        .then(text => setText(text));
    } catch (error) {
      setError(true);
      // eslint-disable-next-line no-console
      console.error('Something went wrong', error);
    }
  }, [fileName, language]);

  if (error || !fileName) {
    return <Page404 raw />;
  }

  if (raw) {
    return content;
  }

  return <Layout>{content}</Layout>;
};
