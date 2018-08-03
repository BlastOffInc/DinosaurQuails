import React from 'react';
import { BarChart } from 'react-d3-components';
import axios from 'axios';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: 'True',
          values: [{ y: 1, x: 'Test 1' }, { y: 2, x: 'Test 2' }, { y: 3, x: 'Test 3' }],
        },
        {
          label: 'False',
          values: [{ y: 3, x: 'Test 1' }, { y: 2, x: 'Test 2' }, { y: 1, x: 'Test 3' }],
        },
      ],
    };
  }
  emptyCatch(obj) {
    return obj || { callback: 0, interview: 0, total: 0 };
  }
  cleanUpData(data) {
    return [
      {
        label: 'True',
        values: [
          { y: this.emptyCatch(data.customizedFulltrue).callback, x: 'Customised: Fully' },
          { y: this.emptyCatch(data.customizedPersonaltrue).callback, x: 'Personal Section' },
          { y: this.emptyCatch(data.customizedSotwareEngineeringProjectstrue).callback, x: 'Projects' },
          { y: this.emptyCatch(data.customizedCoverLettertrue).callback, x: 'Cover Letter' },
          { y: this.emptyCatch(data.mentionedNonTechnicalExperiencetrue).callback, x: 'Added Non-Tech Info' },
          { y: this.emptyCatch(data.codeLinkstrue).callback, x: 'Had Code Links' },
          { y: this.emptyCatch(data.deployedLinkstrue).callback, x: 'Had Deployed Links' },
          { y: this.emptyCatch(data.referraltrue).callback, x: 'Had A Referral' },
          { y: this.emptyCatch(data.usedARecruitertrue).callback, x: 'Used A Recruiter' },
          { y: this.emptyCatch(data.networkedtrue).callback, x: 'Networked' },
          { y: this.emptyCatch(data.inCompanyConnectiontrue).callback, x: 'Had A Connection' },
        ],
      },
      {
        label: 'False',
        values: [
          { y: this.emptyCatch(data.customizedFullfalse).callback, x: 'Customised: Fully' },
          { y: this.emptyCatch(data.customizedPersonalfalse).callback, x: 'Personal Section' },
          { y: this.emptyCatch(data.customizedSotwareEngineeringProjectsfalse).callback, x: 'Projects' },
          { y: this.emptyCatch(data.customizedCoverLetterfalse).callback, x: 'Cover Letter' },
          { y: this.emptyCatch(data.mentionedNonTechnicalExperiencefalse).callback, x: 'Added Non-Tech Info' },
          { y: this.emptyCatch(data.codeLinksfalse).callback, x: 'Had Code Links' },
          { y: this.emptyCatch(data.deployedLinksfalse).callback, x: 'Had Deployed Links' },
          { y: this.emptyCatch(data.referralfalse).callback, x: 'Had A Referral' },
          { y: this.emptyCatch(data.usedARecruiterfalse).callback, x: 'Used A Recruiter' },
          { y: this.emptyCatch(data.networkedfalse).callback, x: 'Networked' },
          { y: this.emptyCatch(data.inCompanyConnectionfalse).callback, x: 'Had A Connection' },
        ],
      },
    ];
  }
  componentDidMount() {
    axios
      .get('/application/analytics', { params: { type: 'All' } })
      .then(({ data }) => this.setState({ data: this.cleanUpData(data) }));
  }
  render() {
    return (
      <div ref="root">
        <div style={{ width: '50%' }}>
          <BarChart
            ylabel="Callback Rate"
            width={window.innerWidth * 0.95}
            height={500}
            data={this.state.data}
            margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
            groupedBars
          />
        </div>
      </div>
    );
  }
}

export default Application;
