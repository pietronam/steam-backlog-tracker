import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaChartBar,
  FaClipboardList,
  FaRandom,
  FaStar,
  FaSteam,
  FaTags,
} from "react-icons/fa";
import { useState } from "react";

import backlogScreenshot from "../assets/steam_backlog_tracker_screenshot.png";
import { LoginDialog } from "./LoginDialog";
import { steamButtons } from "./theming/steamButtons";
import { steamColors } from "./theming/steamColors";
import { steamLayout } from "./theming/steamLayout";
import { steamMisc } from "./theming/steamMisc";

const features = [
  {
    title: "Import your Steam library",
    description:
      "Import every game from your Steam account and immediately begin organizing your backlog.",
    icon: FaSteam,
  },
  {
    title: "Prioritize your next adventure",
    description:
      "Mark important games so your next choice is always obvious.",
    icon: FaClipboardList,
  },
  {
    title: "Organize with tags",
    description:
      "Genres, personal tags and notes keep your library searchable.",
    icon: FaTags,
  },
  {
    title: "Random game picker",
    description:
      "Can't decide? Let the tracker choose your next game.",
    icon: FaRandom,
  },
  {
    title: "Track your favourites",
    description:
      "Rate games you've completed and remember what you loved.",
    icon: FaStar,
  },
  {
    title: "View your statistics",
    description:
      "See how your backlog evolves over time.",
    icon: FaChartBar,
  },
];

export const Landing = () => {
  const [showLoginDialogDialog, setShowLoginDialog] = useState(false);

  const handleGetStarted = () => {
    setShowLoginDialog(true);
  };

  return (
    <Box css={steamLayout.page}>
      {/* HEADER */}

      <Box
        bg={steamColors.header}
        borderBottom={`1px solid ${steamColors.border}`}
      >
        <Container maxW="7xl">
          <Flex h="72px" align="center" justify="space-between">
            <HStack gap={3}>
              <Icon as={FaSteam} boxSize={8} />
              <Heading size="lg" color="white">
                Steam Backlog Tracker
              </Heading>
            </HStack>

            <Button
              css={steamButtons.successButton}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* HERO */}

      <Box
        position="relative"
        h="560px"
        overflow="hidden"
        bg="linear-gradient(135deg,#20384e,#101822)"
      >
        {/* Replace this with a screenshot later */}
        <Box
          position="absolute"
          inset={0}
          opacity={0.15}
          backgroundImage={`url(${backlogScreenshot})`}
          backgroundSize="cover"
          backgroundPosition="center"
        />

        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(rgba(27,40,56,.15), rgba(27,40,56,.92))"
        />

        <Container
          maxW="7xl"
          position="relative"
          h="100%"
        >
          <Flex
            h="100%"
            align="center"
            maxW="650px"
          >
            <Stack gap={7}>
              <Text
                color={steamColors.blue}
                fontWeight="bold"
                letterSpacing="1px"
              >
                STEAM BACKLOG TRACKER
              </Text>

              <Heading
                color="white"
                fontSize={{
                  base: "4xl",
                  md: "5xl",
                }}
                lineHeight="1.1"
              >
                Organize your Steam library.
                <br />
                Finish more games.
              </Heading>

              <Text
                color={steamColors.textPrimary}
                fontSize="lg"
              >
                Import your Steam account, prioritize your backlog,
                organise games with tags, and let the random picker
                choose what to play next.
              </Text>

              <HStack>
                <Button
                  css={steamButtons.successButton}
                  size="lg"
                  onClick={handleGetStarted}
                >
                  Import Steam Library
                </Button>
              </HStack>

              <Grid
                templateColumns="repeat(2,1fr)"
                gap={4}
                pt={5}
              >
                {[
                  "Steam Import",
                  "Priority System",
                  "Custom Tags",
                  "Random Picker",
                ].map((item) => (
                  <HStack key={item}>
                    <Box
                      w="8px"
                      h="8px"
                      rounded="full"
                      bg={steamColors.blue}
                    />
                    <Text color={steamColors.textPrimary}>
                      {item}
                    </Text>
                  </HStack>
                ))}
              </Grid>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* FEATURES */}

      <Container
        maxW="7xl"
        py={10}
      >
        <Heading
          size="lg"
          mb={5}
          color="white"
        >
          Features
        </Heading>

        <Stack gap={4}>
          {features.map((feature) => (
            <Flex
              key={feature.title}
              css={steamMisc.card}
              p={5}
              align="center"
              gap={6}
            >
              <Flex
                w="70px"
                h="70px"
                align="center"
                justify="center"
                bg={steamColors.surface}
                borderRadius="4px"
              >
                <Icon
                  as={feature.icon}
                  boxSize={8}
                  color={steamColors.blue}
                />
              </Flex>

              <Box flex={1}>
                <Heading
                  size="md"
                  color="white"
                  mb={2}
                >
                  {feature.title}
                </Heading>

                <Text color={steamColors.textPrimary}>
                  {feature.description}
                </Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Container>

      {/* CTA */}

      <Box
        mt={16}
        bg={steamColors.header}
        borderTop={`1px solid ${steamColors.border}`}
      >
        <Container
          maxW="7xl"
          py={14}
        >
          <Flex
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap={8}
          >
            <Box>
              <Heading
                color="white"
                mb={3}
              >
                Ready to clean up your backlog?
              </Heading>

              <Text color={steamColors.textSecondary}>
                Join thousands of unfinished adventures and finally decide what
                to play next.
              </Text>
            </Box>

            <Button
              css={steamButtons.successButton}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Flex>
        </Container>
      </Box>

      <LoginDialog
        open={showLoginDialogDialog}
        onOpenChange={(details) => setShowLoginDialog(details.open)}
      />
    </Box>
  );
};