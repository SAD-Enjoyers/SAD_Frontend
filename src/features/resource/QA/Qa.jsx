import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const commonQuestions = [
  {
    question: "How can I create and sell a course on this platform?",
    answer:
      'To create and sell a course, sign up, navigate to your dashboard, and use the "Add Course" feature to upload videos and set pricing. Once approved, your course will be live.',
  },
  {
    question: "How does the automated test grading work?",
    answer:
      "Our system uses predefined answers and algorithms to automatically evaluate multiple-choice questions and provide instant feedback to test takers.",
  },
  {
    question: "Can I write blogs and share my experiences?",
    answer:
      'Yes! You can write and publish blogs directly from your profile. Navigate to the "Add Article" section, compose your post, and share it with the community.',
  },
  {
    question: "How are user profiles evaluated for resumes?",
    answer:
      "User profiles are evaluated based on course participation, test results, blog activity, and peer reviews. This comprehensive evaluation helps build a strong resume.",
  },
  {
    question: "How do I find relevant courses for my skill level?",
    answer:
      "You can use the search feature and apply filters such as skill level, category, and instructor rating to find courses that suit your needs.",
  },
  {
    question: "How can I benefit from writing blogs on this platform?",
    answer:
      "Writing blogs allows you to share your knowledge and experiences with the community, gain visibility, and build a personal brand. It's also an excellent way to contribute to your profile and improve your evaluation score.",
  },
  {
    question: "Can companies use this platform for recruiting?",
    answer:
      "Yes, companies can browse user profiles to assess their course participation, test results, and overall contributions, making it easier to find suitable candidates for job opportunities.",
  },
  {
    question: "How do instructors get paid for their courses?",
    answer:
      "Payments for courses are made directly from students to instructors, ensuring a transparent and straightforward financial process.",
  },
  {
    question: "What is the evaluation system for user profiles?",
    answer:
      "The evaluation system considers various factors, including course participation, test results, blog activity, and peer reviews. These metrics collectively contribute to building a strong resume.",
  },
  {
    question: "Are there any restrictions on creating courses?",
    answer:
      "No specific evaluations are required to create a course. However, all courses undergo a brief approval process to ensure quality before going live.",
  },
  {
    question: "What makes the automated grading system reliable?",
    answer:
      "Our grading system employs advanced algorithms and predefined answers, offering instant and accurate feedback for multiple-choice tests.",
  },
  {
    question: "How can I improve my visibility on the platform?",
    answer:
      "Engage with the community by writing blogs, participating in courses, and actively sharing feedback. Instructors can also use promotional options to feature their courses.",
  },
  {
    question:
      "What happens if I face technical issues during a test or course?",
    answer:
      'You can report any technical issues through the "Contact Us" page. Our support team will address your concerns promptly.',
  },
  {
    question: "Are there any prerequisites for joining this platform?",
    answer:
      "No, anyone interested in learning, teaching, or building a resume can join. Whether you're a student, professional, or instructor, the platform is designed for all skill levels.",
  },
  {
    question: "How do I provide feedback for courses I’ve taken?",
    answer:
      "After completing a course, you can rate it and leave comments on the course page. This helps future students make informed decisions.",
  },
];

const QAPage = () => {
  return (
    <Container sx={{ mt: 8, mb: 6 }}>
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mb={6}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <HelpOutlineIcon
          sx={{
            color: "#378CE7",
            mr: { sm: 2, xs: 0 },
            mb: { xs: 1, sm: 0 },
          }}
          fontSize="large"
        />
        <Typography variant="h4" fontWeight="bold" color="#333">
          Frequently Asked Questions
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />

      {/* Questions and Answers */}
      <Grid container spacing={2}>
        {commonQuestions.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              sx={{
                boxShadow: "none",
                border: 1,
                borderColor: "grey.300",
                bgcolor: "#F7F9FC", // light gray background for the accordion
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#378CE7" }} />}
                sx={{
                  fontWeight: "bold",
                  bgcolor: "#F0F4F8", // soft gray for summary
                  px: 2,
                  color: "#333", // darker text for question
                }}
              >
                <Typography variant="h6">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2 }}>
                <Typography variant="body1" color="textSecondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      {/* Footer Section */}
      <Divider sx={{ mt: 6, mb: 3 }} />
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ px: { xs: 2, sm: 0 } }}
      >
        For further inquiries, please contact our support team at{" "}
        <Typography component="span" color="#378CE7" fontWeight="bold">
          support@example.com
        </Typography>{" "}
        or call us at{" "}
        <Typography component="span" color="#378CE7" fontWeight="bold">
          +1 (800) 123-4567
        </Typography>
        .
      </Typography>
    </Container>
  );
};

export default QAPage;
