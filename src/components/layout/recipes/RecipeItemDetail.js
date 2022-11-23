import React from 'react';
import PropTypes from 'prop-types';
import { css, styled } from '@storybook/theming';
import { styles, animation } from '@storybook/design-system';
import { IntegrationImage } from './IntegrationImage';
import emptySVG from '../../../images/addon-catalog/recipes/recipe-empty.svg';

const { color, typography, breakpoint } = styles;
const { inlineGlow } = animation;

const RecipeItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
  border-bottom: 1px solid ${color.border};

  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-bottom: 3rem;

  @media (min-width: ${1.5 * breakpoint}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 40px;
  }
`;

const Image = styled.div`
  flex: none;
  width: 64px;
  height: 64px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${(props) =>
    props.isLoading &&
    css`
      ${inlineGlow}
    `}
`;
Image.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

const Title = styled.div`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.l1}px;
  line-height: ${typography.size.l2}px;
  text-align: center;
  color: ${color.darkest};
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-top: 24px;
  }

  span {
    width: 100%;
  }

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.l1}px;
      span {
        ${inlineGlow}
        margin-bottom: 8px;
      }
    `}
`;
Title.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Description = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 28px;
  text-align: center;
  color: ${color.darkest};
  position: relative;
  max-width: 600px;

  span {
    width: 100%;
  }

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.s3}px;
      span {
        ${inlineGlow}
      }
    `};
`;

const RecipeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const RecipeItemDetail = ({
  icon = emptySVG,
  name,
  displayName,
  description,
  weeklyDownloads,
  appearance,
  status,
  isLoading,
  verifiedCreator,
  publishedAt,
  npmUrl,
  accentColor = '#ca8fff',
  ...props
}) => {
  const formattedName = displayName || name;
  const formattedDescription = `${description} This recipe shows you how to get the most out of ${formattedName} in Storybook.`;

  return (
    <RecipeItemWrapper {...props}>
      <RecipeInfo>
        <IntegrationImage icon={icon} accent={accentColor} withConnector />
        <div>
          <Title isLoading={isLoading}>
            <span>{isLoading ? 'loading' : `Integrate ${formattedName} and Storybook`}</span>
          </Title>
          <Description isLoading={isLoading}>
            <span>{isLoading ? 'loading description of addon' : formattedDescription}</span>
          </Description>
        </div>
      </RecipeInfo>
    </RecipeItemWrapper>
  );
};

/* eslint-disable react/require-default-props */
RecipeItemDetail.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrators', 'community']),
  status: PropTypes.oneOf(['default', 'essential', 'deprecated']),
  icon: PropTypes.string,
  name: PropTypes.string,
  displayName: PropTypes.string,
  description: PropTypes.string,
  weeklyDownloads: PropTypes.number,
  isLoading: PropTypes.bool,
  verifiedCreator: PropTypes.string,
  publishedAt: PropTypes.number,
  npmUrl: PropTypes.string,
};

RecipeItemDetail.defaultProps = {
  appearance: 'community',
  status: 'default',
  weeklyDownloads: 0,
  isLoading: false,
  name: '',
  description: '',
  verifiedCreator: '',
  npmUrl: '',
};
