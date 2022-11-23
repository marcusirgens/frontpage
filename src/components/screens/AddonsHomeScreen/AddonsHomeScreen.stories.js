import React from 'react';
import { AddonsHomeScreen as AddonsHomeScreenComponent } from './AddonsHomeScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';
import { recipeItemsData } from '../../layout/recipes/RecipesList.stories';
import { UseAddonsSearchDecorator } from '../../../../.storybook/use-addons-search.mock';

export default {
  title: 'Integrations Catalog/Screens/AddonsHomeScreen',
  component: AddonsHomeScreenComponent,
  decorators: [UseAddonsSearchDecorator],
  parameters: {
    chromatic: { viewports: [320, 1200] },
    layout: 'fullscreen',
    pageLayout: {
      pathname: '/integrations',
    },
  },
};

export const Default = () => (
  <AddonsHomeScreenComponent
    pageContext={{
      popularAddons: addonItemsData.slice(0, 6),
      popularRecipes: recipeItemsData.slice(0, 3),
      trendingAddons: addonItemsData.slice(-9),
      trendingTags: [
        {
          link: '/notes',
          displayName: 'Notes',
          icon: '🗒',
        },
        {
          link: '/storybook',
          displayName: 'Storybook',
          icon: '📕',
        },
        {
          link: '/qa',
          displayName: 'QA',
          icon: '🕵️‍♀️',
        },
        {
          link: '/prototype',
          displayName: 'Prototype',
          icon: '✨',
        },
        {
          link: '/testing',
          displayName: 'Testing',
          icon: '✅',
        },
        {
          link: '/deploy',
          displayName: 'Deploy',
          icon: '☁️',
        },
      ],
    }}
  />
);
