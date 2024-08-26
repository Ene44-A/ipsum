import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
