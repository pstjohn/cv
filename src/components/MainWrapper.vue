<template>
  <div class="main-wrapper" :class="{ 'single-page': singlePage }">
    <MainSection title="About Me" icon="user">
      <div class="summary">
        <p>
          Machine Learning Engineer working on autonomous vehicle training infrastructure at NVIDIA.
          Former project lead and senior scientist at the National Renewable Energy Laboratory
          specializing in AI for materials discovery and protein engineering.
        </p>
      </div>
    </MainSection>

    <MainSection title="Experience" icon="briefcase">
      <ExperienceCompany company="NVIDIA" location="Boulder, CO" startDate="2022-12-05" endDate="Present">
        <template v-slot:logo>
          <img :src="require('@/assets/images/Nvidia_logo.svg')" />
        </template>

        <ExperienceEntry jobTitle="Machine Learning Engineer" department="Autonomous Vehicles">
          <ul>
            <li>
              Working on the Perception ML Foundation team to improve training efficiency and streamline MLOps for
              autonomous vehicles.
            </li>
            <li>
              Maintained critical data infrastructure pipelines; implemented performance and stability monitoring in sentry.
            </li>
            <li>
              Reduced on-disk dataset size by a factor of 4 while maintaining dataloader speed, a reduction of over 100 TB.
            </li>
            <li>
              Parallelized data processing pipelines to reduce runtime from >20hrs to ~5 hrs.
            </li>
          </ul>
        </ExperienceEntry>
      </ExperienceCompany>


      <ExperienceCompany company="National Renewable Energy Lab" location="Golden, CO" startDate="2015-06-02"
        endDate="2022-12-02">
        <template v-slot:logo>
          <img :src="require('@/assets/images/nrel-logo.jpg')" />
        </template>

        <ExperienceEntry jobTitle="Senior Scientist" department="Biosciences Center"
          company="National Renewable Energy Lab" time="2020-Present">
          <ul>
            <li>
              Proposed, planned, and executed a $1.8M dollar research effort
              across three institutions on deep learning methods (publications
              in
              <a class="fst-italic" href="https://doi.org/10.1038/s42256-022-00506-3">Nat Mach Intell</a>
              and
              <a class="fst-italic" href="https://doi.org/10.1016/j.patter.2021.100361">Patterns</a>.)
            </li>
            <li>
              Lead software architect on
              <a href="https://joss.theoj.org/papers/10.21105/joss.04621">peer-reviewed software</a>
              for reinforcement learning and optimization
              <span class="tech"><a href="https://github.com/NREL/graph-env/"><font-awesome-icon
                    icon="fa-brands fa-github" />
                  NREL/graph-env</a>
                (Python, Tensorflow, CI/CD)</span>
            </li>
            <li>
              Lead NREL PI on a 3-year, $1M grant grant focused on predicting
              thermotolerance and pH tolerance of enzymatic transformations
              <span class="tech">(fairseq, torch)</span>
            </li>
            <li>
              Project lead for a $275K/year Co-Optima subtask, developed
              explanatory model for particulate emissions for industry
              stakeholders <span class="tech">(scikit-learn, pymc)</span>.
            </li>
          </ul>
        </ExperienceEntry>

        <ExperienceEntry jobTitle="Staff Scientist" department="Biosciences Center"
          company="National Renewable Energy Lab" time="2017-2020">
          <ul>
            <li>
              Managed a multi-million record, multi-user
              <span class="tech">SQL (Postgres)</span> database with pipelines
              for ML model training. Published in
              <a class="fst-italic" href="https://doi.org/10.1038/s41597-020-00588-x">Scientific Data</a>
            </li>
            <li>
              Trained a custom graph neural network (<span class="tech">tensorflow 2 / keras</span>), and deployed a
              containerized web application (<span class="tech">Docker / FastAPI / Flask</span>, <a
                href="https://bde.ml.nrel.gov/">bde.ml.nrel.gov</a>) on
              <span class="tech">AWS</span> with over 8k unique users. Published
              in
              <a href="https://doi.org/10.1038/s41467-020-16201-z"><span class="fst-italic">Nature
                  Communications</span></a>
            </li>
            <li>
              Pre-trained a BERT-style natural language processing model on 261M
              unlabeled protein sequences using over 1024 GPUs (<span class="tech">torch</span>).
            </li>
            <li>
              Recipient of NREL's
              <span class="award"><font-awesome-icon icon="fa-solid fa-award" /> President's
                Award</span>
              (2019) for exceptional achievements.
            </li>
          </ul>
        </ExperienceEntry>

        <ExperienceEntry jobTitle="Postdoctoral Scholar" department="Biosciences Center"
          company="National Renewable Energy Lab" time="2015-2017">
          <ul>
            <li :class="{ 'd-none': singlePage }">
              Used metabolic modeling (<span class="tech">Python / cobrapy</span>) to suggest unintuitive reaction
              knockout to improve yields of
              muconic acid from glucose. Improved yields in shake flasks from 7%
              to 41%, matching modeling predictions within a few percent.
              Published in
              <a href="https://doi.org/10.1016/j.joule.2019.05.011"><span class="fst-italic">Joule</span></a>.
            </li>
            <li>
              Recipient of NREL's
              <span class="award">
                <font-awesome-icon icon="fa-solid fa-award" /> Director's
                Award</span>
              (2017) for exceptional achievements.
            </li>
          </ul>
        </ExperienceEntry>
      </ExperienceCompany>

      <ExperienceCompany company="Colorado State University" startDate="2022-01-15" location="Fort Collins, CO"
        endDate="Present">
        <template v-slot:logo>
          <img :src="require('@/assets/images/csu-logo.jpg')" />
        </template>

        <ExperienceEntry jobTitle="Faculty Affiliate" company="Colorado State University" department="Chemistry"
          time="2021-Present">
          <ul>
            <li>
              Mentored graduate students and postdoctoral researchers in the
              Chemistry department on machine learning research
            </li>
            <li :class="{ 'd-none': singlePage }">
              Co-PI on award for over $20K in computational resources (XSEDE
              award CHE210034)
            </li>
          </ul>

          <!-- over 20,000 XSEDE award.</p> -->
        </ExperienceEntry>
      </ExperienceCompany>
    </MainSection>

    <div :class="{ 'd-none': !singlePage }">
      <MainSection title="Software" icon="box-open">
        <masonry-wall :items="githubEntries" :ssr-columns="1" :column-width="200" :gap="5">
          <template #default="{ item }">
            <GithubRepo :name="item.name" :pypi="item.pypi" />
          </template>
        </masonry-wall>
      </MainSection>
    </div>

    <div :class="{ 'd-none': singlePage }">
      <MainSection title="Grants" icon="money-check-dollar">
        <GrantsEntry
          title="End-to-End Optimization for Battery Materials and Molecules by Combining Graph Neural Networks and Reinforcement Learning"
          time="04-09-2020 to 04-08-2022" organization="Advanced Research Projects Agency-Energy" amount="USD 1,800,000"
          link="https://arpa-e.energy.gov/technologies/projects/end-end-optimization-battery-materials-and-molecules-combining-graph-neural"
          pi="Peter St. John (NREL)">
          <template v-slot:image>
            <img class="arpae" :src="require('@/assets/images/arpae.svg')" />
          </template>
          <p>
            This project was funded under the
            <a href="https://arpa-e.energy.gov/technologies/programs/differentiate">DIFFERENTIATE</a>
            program and focused on delivering high-quality software for
            goal-oriented material generation using reinforcement learning. We
            demonstrated our method on two challenge problems: finding novel
            organic radicals for redox flow batteries and optimizing interface
            chemistry for solid state batteries.
          </p>
        </GrantsEntry>

        <GrantsEntry title="Novel Systems Approach for Rational Engineering of Robust Microbial Metabolic Pathways"
          time="09-01-2021 to 08-31-2024" organization="Biological and Environmental Research" amount="USD 969,131"
          pi="Laura Jarboe (ISU)"
          link="https://pamspublic.science.energy.gov/WebPAMSExternal/Interface/Common/ViewPublicAbstract.aspx?rv=e8998df0-6796-4d9c-ad11-40fc9eae0d0d&rtc=24&PRoleId=10">
          <template v-slot:image>
            <img class="arpae" :src="require('@/assets/images/ber.svg')" />
          </template>
          <p>
            This award was funded under
            <a href="https://genomicscience.energy.gov/microbial-conversion-2021-awards/">FOA-2448
            </a>
            under the Genomic Science Program to develop systems biology tools
            for rationally engineering robustness in microbial hosts. I am
            serving as the NREL lead PI, leading Aim 1, Metabolic Systems
            Modeling.
          </p>
        </GrantsEntry>

        <GrantsEntry title="STTR Phase I: Robust High-Performance Organic Electro-Optic Materials"
          time="04-15-2021 to 10-31-2022" organization="Directorate for Technology, Innovation and Partnerships"
          amount="USD 256,000" pi="Lewis Johnson (Nonlinear Materials, Seattle WA)"
          link="https://www.sbir.gov/node/2087727">
          <p>
            I am the NREL PI on this technology transfer award under the DOE
            Basic Energy Sciences, which seeks to commercialize aspects of our
            bond dissociation energy tool for predicting thermal decomposition
            of high-temperature organic electronics.
          </p>
        </GrantsEntry>

        <GrantsEntry title="Chemistream: Big Data Materials on HPC Clouds" time="05-03-2021 to 05-02-2023"
          organization="Office of Science" amount="USD 1,649,705" pi="Scott Sides (Tech-X, Boulder CO)"
          link="https://www.sbir.gov/sbirsearch/detail/1710925">
          <p>
            This award is developing AWS interfaces to the several of the ML and
            RL toolkits I have developed at NREL. I have served as key personnel
            on both the Phase I and Phase II applications.
          </p>
        </GrantsEntry>
      </MainSection>

      <MainSection title="Publications" icon="file-lines">
        <MainCitations />
      </MainSection>

      <MainSection title="Intellectual Property" icon="lightbulb">
        <h3>Patents</h3>
        <ul class="citation-container one-column">
          <li class="citation">
            Johnson, C. W., <span class="me">St. John, P. C.</span>, Beckham, G.
            T., Elmore, J. R., Guss, A. M., Rodriguez, D. S., Bentley, G. J., &
            Peabody, G. L. (2019). Engineered microorganisms for the production
            of intermediates and final products (Patent Application No. US
            2019/0367865 A1).
            <a href="https://patentscope.wipo.int/search/en/detail.jsf?docId=US278278877">[link]</a>
          </li>
        </ul>
        <div class="year-split">
          <h3>Software Records</h3>
          <ul class="citation-container software">
            <li class="citation">
              Tripp, C., <span class="me">St. John, P. C.</span>, Biagioni, D.,
              Clark, S., Duplyakin, D., Law, J. (2022, April 15). Graph-Env
              <a href="https://doi.org/10.11578/dc.20220622.3">[doi]</a>
            </li>

            <li class="citation">
              Biagioni, D., Skordilis, E., Tripp, C., Duplyakin, D.,
              <span class="me">St. John, P. C.</span>, (2020, December 17).
              rlmolecule: A library for general-purpose material and molecular
              optimization using AlphaZero-style reinforcement learning.
              <a href="https://doi.org/10.11578/dc.20201221.3">[doi]</a>
            </li>

            <li class="citation">
              Wilson, N., <span class="me">St. John, P. C.</span>, Crowley, M.,
              (2020, June 19). m2p (Monomers to Polymers)
              <a href="https://doi.org/10.11578/dc.20200922.9">[doi]</a>
            </li>

            <li class="citation">
              <span class="me">St. John, P. C.</span>, (2019, January 14). nfp
              (Neural Fingerprint) and alfabet
              <a href="https://doi.org/10.11578/dc.20190731.1">[doi]</a>
            </li>
          </ul>
        </div>
      </MainSection>

      <MainSection title="Presentations" icon="chalkboard-user">
        <h3>Invited Presentations</h3>
        <ul>
          <li>
            (2021) Quantitative Modelling of Cell Metabolism - International
            Conference & Workshop, Copenhagen
          </li>
          <li>
            (2017) Estimation of the Maximum Theoretical Productivity of
            Fed-Batch Bioreactors. 20th IFAC World Congress, Toulouse, France.
          </li>
          <li>
            (2015) Mathematical Approaches to Understanding Mammalian Circadian
            Rhythms. AMS Colloquium, Colorado School of Mines, Golden CO
          </li>
        </ul>
        <p></p>
        <h3>Session Chair</h3>
        <ul>
          <li>(2018) Integrative Systems Biology, AIChE Annual Meeting</li>
        </ul>
      </MainSection>

      <MainSection title="Mentorship" icon="users-rectangle">
        <ul>
          <li>(2021-Present) Shree Sowndarya S. V., Graduate Student</li>
          <li>(2021-Present) Jeffery Law, Postdoctoral Researcher</li>
          <li>
            (2021) Collin Barraugh, Graduate Student (currently Data Scientist
            at Outside)
          </li>
          <li>
            (2019) Lauren Stanislaw, Undergraduate Student (currently at
            University of Victoria)
          </li>
          <!-- <li>(2018) Nathan Ruffatti, Undergraduate Student</li> -->
          <li>(2016) Paul Kairys, Undergraduate Student (currently at ORNL)</li>
          <li>
            (2015) Amanda Luan, Undergraduate Student (currently Sr. Lead
            Product Manager at EA)
          </li>
          <li>
            (2014-2015) Lukas Widmer, Masters Student (currently Sr. Principal
            Statistical Consultant at Novartis)
          </li>
          <li>
            (2012) Andrew Barisser, Rotation Student (currently Sr. Technical
            Manager at The Voleon Group)
          </li>
        </ul>
      </MainSection>
    </div>
  </div>
</template>

<script>
import MainSection from './MainSection.vue';
import MainCitations from './MainCitations.vue';
import ExperienceEntry from './ExperienceEntry.vue';
import GrantsEntry from './GrantsEntry.vue';
import ExperienceCompany from './ExperienceCompany.vue';
import GithubRepo from './sidebar/GithubRepo.vue';

export default {
  name: 'MainWrapper',
  props: ['singlePage'],
  data() {
    return {
      githubEntries: [
        { name: 'pstjohn/d3flux', pypi: 'd3flux' },
        { name: 'NREL/nfp', pypi: 'nfp' },
        { name: 'NREL/alfabet', pypi: 'alfabet' },
        // { name: 'pstjohn/bde' },
        { name: 'NREL/rlmolecule', pypi: 'rlmolecule' },
        { name: 'NREL/graph-env', pypi: 'graphenv' },
        { name: 'opencobra/cobrapy', pypi: 'cobra' },
      ],
    };
  },
  components: {
    MainSection,
    MainCitations,
    ExperienceEntry,
    GrantsEntry,
    ExperienceCompany,
    GithubRepo,
  },
};
</script>

<style lang="scss">
@media (max-width: 767.98px) {
  .main-wrapper {
    padding: 20px;

    .upper-row {
      margin-bottom: 0;
    }
  }
}

@media print,
(min-width: 768px) {
  .main-wrapper {
    padding: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 300px;
    background: white;
  }
}

@media screen {
  .main-wrapper {
    background: $theme-color;
  }
}

.tech,
.award {
  font-weight: 700;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.one-column {
  column-count: 1 !important;
}

.software .citation {
  margin-bottom: 10px;
}

ul.citation-container {
  list-style: none;
  column-count: 2;
  column-width: 300px;
  column-gap: 10px;
  padding-left: 0rem;
  column-fill: balance;
  font-weight: 300;
  margin-bottom: 0;

  li {
    position: relative;
    // margin-bottom: 0.5rem;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    -moz-column-break-inside: avoid;
    -moz-page-break-inside: avoid;
    page-break-inside: avoid;
  }
}

.main-wrapper {
  .github-component {
    margin: 0;
  }
}
</style>
