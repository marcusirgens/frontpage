import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import {
  styles,
  SectionLede,
  IntegrationsList,
  ValuePropCopy,
  Testimonial,
} from '@storybook/components-marketing';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { Stat } from '../../basics/Stat';
import AtomicDesignLogoSVG from '../../../images/logos/user/logo-atomicdesign.svg';
import { Integrations } from './Integrations';
import { StorybookDemo } from './StorybookDemo/StorybookDemo';

const { subheading, breakpoints, pageMargins } = styles;

const Wrapper = styled.section`
  padding-top: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 7rem;
  }
`;

const featuredFrameworks = ['react', 'vue', 'angular', 'web-components', 'html'];
const frameworkIntegrations = featuredFrameworks.map((framework) => ({
  name: framework,
  image: `/frameworks/logo-${framework}.svg`,
  href: `/docs/${framework}`,
  ButtonWrapper: GatsbyLinkWrapper,
}));

const MadeFor = styled.section`
  ${subheading.small};
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`;

const StickTextWrapper = styled.div`
  grid-column: 1 / 2;
`;

const Spacer = styled.div`
  height: 64rem;
`;

const ValueProp = styled(ValuePropCopy)`
  position: sticky;
  top: 40%;

  @media (min-width: ${breakpoints[0]}px) {
    top: 50%;
  }

  @media (min-width: ${breakpoints[1]}px) {
    top: 60%;
  }

  @media (min-width: ${breakpoints[2]}px) {
    top: 4rem;
  }
`;

const ValuePropIntegrations = styled(ValuePropCopy)`
  align-self: center;
`;

const Content = styled.div`
  ${pageMargins};
  padding-top: 16rem;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 6rem;
  grid-auto-flow: dense;

  @media (min-width: ${breakpoints[2]}px) {
    justify-items: flex-start;
    grid-template-columns: minmax(max-content, 320px) 1fr;
  }
`;

const StorybookDemoWrapper = styled.figure`
  position: sticky;
  top: 4rem;
  width: 100%;
  order: -1;
  z-index: 999;
  margin: 0;
  align-self: flex-start;

  @media (min-width: ${breakpoints[2]}px) {
    width: 150%;
    max-width: 800px;
    grid-column: 2 / 3;
  }
`;

const IntegrationsGrid = styled(Integrations)`
  position: sticky;
  top: 4rem;

  @media (min-width: ${breakpoints[2]}px) {
    grid-column: 2 / 3;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 30px;
`;

export function Develop({ docs, startOpen, ...props }) {
  // Step 1
  const isolationRef = useRef(null);
  const { scrollYProgress: isolationProgress } = useScroll({
    target: isolationRef,
    offset: ['end end', 'end start'],
  });
  const smoothIsolationProgress = useSpring(isolationProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 2
  const storiesRef = useRef(null);
  const { scrollYProgress: storiesProgress } = useScroll({
    target: storiesRef,
    offset: ['start start', 'end start'],
  });
  const activeStory = useTransform(storiesProgress, (value) => Math.floor(value * 3));
  const smoothStoriesProgress = useSpring(storiesProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 3
  const addonsRef = useRef(null);
  const { scrollYProgress: addonsProgress } = useScroll({
    target: addonsRef,
    offset: ['start .25', 'end start'],
  });
  const activePanel = useTransform(addonsProgress, (value) => Math.floor(value * 4));
  const smoothAddonsProgress = useSpring(addonsProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 4
  const dropInRef = useRef(null);
  const { scrollYProgress: dropInProgress } = useScroll({
    target: dropInRef,
    offset: ['start 0.25', 'start start'],
  });
  const smoothDropInProgress = useSpring(dropInProgress, {
    stiffness: 1000,
    damping: 100,
  });

  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Develop durable user interfaces"
        copy="Storybook provides a workshop to build UIs in isolation. It helps you develop hard-to-reach states and edge cases without needing to run the whole app."
        actions={
          <div>
            <MadeFor>Made for</MadeFor>
            <IntegrationsList integrations={frameworkIntegrations} overflowLabel="+ 7" inverse />
          </div>
        }
      />
      <Content>
        <StorybookDemoWrapper>
          <StorybookDemo
            storyIndex={activeStory}
            panelIndex={activePanel}
            isolationProgress={smoothIsolationProgress}
            addonsProgress={smoothAddonsProgress}
            dropInProgress={smoothDropInProgress}
          />
        </StorybookDemoWrapper>
        <StickTextWrapper ref={isolationRef}>
          <ValueProp
            inverse
            heading="Build UI components and pages in isolation"
            description="Implement components and pages without needing to fuss with data, APIs, or business logic."
            links={
              <>
                <Link containsIcon withArrow href="/why-storybook">
                  Why build UIs in isolation?
                </Link>
                <Link containsIcon withArrow href="/integrations">
                  How does this fit in my tech stack?
                </Link>
              </>
            }
          />
          <Spacer />
        </StickTextWrapper>
        <StickTextWrapper ref={storiesRef}>
          <ValueProp
            inverse
            heading="Mock hard-to-reach edge cases as stories"
            description="Render components in key states that are tricky to reproduce in an app. Then save those states as stories to revisit during development, testing, and QA."
            links={
              <Link containsIcon withArrow href="/why-storybook">
                How to write a story
              </Link>
            }
          />
          <Spacer />
        </StickTextWrapper>
        <StickTextWrapper ref={addonsRef}>
          <ValueProp
            inverse
            heading="Supercharge your workflow with addons"
            description="Addons extend and customize your UI development workflow. There are hundreds of addons that help you build UI faster, document component libraries, and integrate with other tools."
            links={
              <Link containsIcon withArrow href="/why-storybook">
                Learn about addons
              </Link>
            }
          />
          <Spacer />
        </StickTextWrapper>
        <StickTextWrapper ref={dropInRef}>
          <ValueProp
            inverse
            heading="Drop the finished UI components into your app"
            description="Once you finish developing UI components in isolation, drop them into your app. You’ll have confidence that the components are hardened to support every possible edge case."
            links={
              <Link containsIcon withArrow href="/why-storybook">
                Why build UIs in isolation?
              </Link>
            }
          />
          <Spacer />
        </StickTextWrapper>
      </Content>
      <Content>
        <ValuePropIntegrations
          inverse
          heading="Integrate with the tools you already use"
          description="Storybook is incrementally adoptable and integrates with industry-standard tools. That means your team doesn’t have to change their workflow."
          links={
            <Link containsIcon withArrow href="/why-storybook">
              Browse integrations
            </Link>
          }
          meta={
            <Stats>
              <Stat count="400+" text="Integrations" noPlural />
              <Stat count="35M" text="Downloads per week" noPlural />
            </Stats>
          }
        />
        <IntegrationsGrid docs={docs} />
      </Content>
      <Testimonial
        inverse
        text={
          <span>
            “Storybook is a powerful frontend workshop environment tool that allows teams to design,
            build, and organize UI components (and even full screens!) without getting tripped up
            over business logic and plumbing.”
          </span>
        }
        avatarUrl="https://avatars3.githubusercontent.com/u/383701?s=460&v=4"
        name="Brad Frost"
        jobTitle="Author of Atomic Design"
        logo={AtomicDesignLogoSVG}
      />
    </Wrapper>
  );
}

Develop.propTypes = {
  startOpen: PropTypes.bool,
  docs: PropTypes.string.isRequired,
};

Develop.defaultProps = {
  startOpen: false,
};
