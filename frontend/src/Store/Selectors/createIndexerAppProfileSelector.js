import { createSelector } from 'reselect';
import createIndexerSelector from './createIndexerSelector';

function createIndexerAppProfileSelector() {
  return createSelector(
    (state) => state.settings.appProfiles.items,
    createIndexerSelector(),
    (appProfiles, indexer = {}) => {
      return Array(appProfiles.find((profile) => indexer.appProfileIds.includes(profile.id)));
    }
  );
}

export default createIndexerAppProfileSelector;
