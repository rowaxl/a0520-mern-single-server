const express = require("express");
const mongoose = require("mongoose");

const Survey = mongoose.model("Survey");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const router = express.Router();

router.get('/', requireLogin , async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
  res.send(surveys);
});

router.get("/:surveyId/:choices", async (req, res) => {
  const { surveyId, choices } = req.params
  const _id = mongoose.Schema.Types.ObjectId(surveyId)

  const currentSurvey = await Survey.findById(_id)

  const updateBody = choices === 'yes' ?
    {
      yes: currentSurvey.yes + 1
    } :
    {
      no: currentSurvey.no + 1
    }

  try {
    await Survey.updateOne(
      { _id },
      updateBody
    )
  } catch (error) {
    res.status(422).send(err);
  }

  res.send({ msg: "Thank you for participating...." });
}); // domain/api/surveys/23526tqdasfawraa/yes

router.post("/", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  try {
    //helper function to blast out email!
    await mailer(survey, surveyTemplate(survey));
    await survey.save();

    req.user.credits -= 1;
    const user = req.user.save();

    res.send(user);
  } catch (error) {
    res.status(422).send(err);
  }
});

module.exports = router;
