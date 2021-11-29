import fetch from 'node-fetch';

// utils
import logger from '../../common/logger';
import { MakeError } from '../../common/service-error';

// interfaces
import { FeedbackInfo, NewFeedbackResponse } from './interfaces';

const GitHubAPIURL = 'https://api.github.com/repos/andreGarvin/openkey/issues';

// error codes
enum FeedbackErrorCode {
  FAILED_TO_SEND_FEEDBACK_ERROR = 'FAILED_TO_SEND_FEEDBACK_ERROR',
}

// sends a http request to github to save the feedback a issue on github
export const Create = async (
  feedback: FeedbackInfo
): Promise<NewFeedbackResponse> => {
  try {
    const response = await fetch(GitHubAPIURL, {
      method: 'POST',
      body: JSON.stringify({
        title: `New application ${feedback.label} report`,
        body: feedback.message,
        labels: [feedback.label],
      }),
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    if (!response.ok) {
      const err: { message: string } = await response.json();
      logger.error(err);

      throw MakeError(
        `failed to send request to create new issue. ${err.message}`,
        FeedbackErrorCode.FAILED_TO_SEND_FEEDBACK_ERROR,
        400
      );
    }

    const { number, html_url } = await response.json();

    return { url: html_url, number };
  } catch (e) {
    logger.error('failed to send request to create new issue');

    throw e;
  }
};
