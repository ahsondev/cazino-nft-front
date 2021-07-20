import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageContentContainer from '../../components/PageContentContainer';
import PageHeadline from '../../components/PageHeadline';
import ChangeServerSeed from '../../components/ChangeServerSeed';
import { SeedCurrent, SeedPrevious, ServerSeedMe } from '../../models/serverSeedMe';
import { GameTypes } from '../../models/gameTypes.model';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ME } from '../../graphql/queries';
import { CHANGE_SERVER_SEED } from '../../graphql/mutations';
import { success, error } from '../../components/Toast';
import { useUserState } from '../../user/UserProvider';

const SeedPage: React.FC<RouteComponentProps> = () => {
  console.log('seed page');
  const { t } = useTranslation(['seeds']);
  const [getMe, { data }] = useLazyQuery(ME);
  const [{ accessToken }] = useUserState();
  const [seeds, setSeeds] = useState(data.me.seeds as ServerSeedMe);
  const [activeGames] = useState(data.me.activeGames as GameTypes[]);
  const [changeServerSeed, { loading }] = useMutation(CHANGE_SERVER_SEED);

  const onClickChangeServerSeed = async (clientSeed: string) => {
    const { data, errors } = await changeServerSeed({
      variables: { clientSeed },
    });
    if (data) {
      success(t('successUpdateMessage'));
      setSeeds({
        current: data.changeServerSeed.current as SeedCurrent,
        previous: data.changeServerSeed.previous as SeedPrevious,
      } as ServerSeedMe);
    } else if (errors) {
      error(t('failedUpdateMessage'));
    }
  };

  useEffect(() => {
    if (accessToken) {
      getMe();
    }
  }, [accessToken]);

  return (
    <div className="container-md">
      <PageHeadline>{t('pageHeadline')}</PageHeadline>
      <PageContentContainer>
        <ChangeServerSeed
          seeds={seeds}
          activeGames={activeGames}
          onClickChangeSeed={onClickChangeServerSeed}
          loading={loading}
        />
      </PageContentContainer>
    </div>
  );
};

export default SeedPage;
