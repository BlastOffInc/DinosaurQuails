import React from 'react';
import { BarChart } from 'react-d3-components';
import axios from 'axios';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.colorScaleEven = this.colorScaleEven.bind(this);
    this.colorScaleOdd = this.colorScaleOdd.bind(this);
  }
  emptyCatch(obj) {
    return obj || { callback: 0, interview: 0, total: 0 };
  }
  cleanUpData(data, type) {
    return [
      {
        label: 'True',
        values: [
          { y: this.emptyCatch(data.customizedFulltrue)[type], x: 'Customised: Fully' },
          { y: this.emptyCatch(data.customizedPersonaltrue)[type], x: 'Personal Section' },
          { y: this.emptyCatch(data.customizedSotwareEngineeringProjectstrue)[type], x: 'Projects' },
          { y: this.emptyCatch(data.customizedCoverLettertrue)[type], x: 'Cover Letter' },
          { y: this.emptyCatch(data.mentionedNonTechnicalExperiencetrue)[type], x: 'Added Non-Tech Info' },
          { y: this.emptyCatch(data.codeLinkstrue)[type], x: 'Had Code Links' },
          { y: this.emptyCatch(data.deployedLinkstrue)[type], x: 'Had Deployed Links' },
          { y: this.emptyCatch(data.referraltrue)[type], x: 'Had A Referral' },
          { y: this.emptyCatch(data.usedARecruitertrue)[type], x: 'Used A Recruiter' },
          { y: this.emptyCatch(data.networkedtrue)[type], x: 'Networked' },
          { y: this.emptyCatch(data.inCompanyConnectiontrue)[type], x: 'Had A Connection' },
        ],
      },
      {
        label: 'False',
        values: [
          { y: this.emptyCatch(data.customizedFullfalse)[type], x: 'Customised: Fully' },
          { y: this.emptyCatch(data.customizedPersonalfalse)[type], x: 'Personal Section' },
          { y: this.emptyCatch(data.customizedSotwareEngineeringProjectsfalse)[type], x: 'Projects' },
          { y: this.emptyCatch(data.customizedCoverLetterfalse)[type], x: 'Cover Letter' },
          { y: this.emptyCatch(data.mentionedNonTechnicalExperiencefalse)[type], x: 'Added Non-Tech Info' },
          { y: this.emptyCatch(data.codeLinksfalse)[type], x: 'Had Code Links' },
          { y: this.emptyCatch(data.deployedLinksfalse)[type], x: 'Had Deployed Links' },
          { y: this.emptyCatch(data.referralfalse)[type], x: 'Had A Referral' },
          { y: this.emptyCatch(data.usedARecruiterfalse)[type], x: 'Used A Recruiter' },
          { y: this.emptyCatch(data.networkedfalse)[type], x: 'Networked' },
          { y: this.emptyCatch(data.inCompanyConnectionfalse)[type], x: 'Had A Connection' },
        ],
      },
    ];
  }
  componentDidMount() {
    axios.get('/application/analytics', { params: { type: 'All' } }).then(({ data }) =>
      this.setState({
        dataCallback: this.cleanUpData(data, 'callback'),
        dataInterview: this.cleanUpData(data, 'interview'),
        dataTotal: this.cleanUpData(data, 'total'),
      })
    );
  }
  colorScaleEven(label) {
    return label === 'True' ? '#22AF88' : '#228FAF';
  }
  colorScaleOdd(label) {
    return label === 'True' ? '#8822AF ' : '#2249AF';
  }
  render() {
    return (
      <React.Fragment>
        <BarChart
          groupedBars
          width={window.innerWidth * 0.95}
          height={300}
          data={this.state.dataCallback}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          colorScale={this.colorScaleEven}
          yAxis={{ label: 'Callback Rate' }}
        />
        <BarChart
          groupedBars
          width={window.innerWidth * 0.95}
          height={300}
          data={this.state.dataInterview}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          colorScale={this.colorScaleOdd}
          yAxis={{ label: 'Interview Rate' }}
        />
        <BarChart
          groupedBars
          width={window.innerWidth * 0.95}
          height={193}
          data={this.state.dataTotal}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          colorScale={this.colorScaleEven}
          yAxis={{ label: 'Total Occurrences' }}
        />
      </React.Fragment>
    );
  }
}

export default Application;
