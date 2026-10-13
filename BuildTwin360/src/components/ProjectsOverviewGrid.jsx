import React from 'react';
import ProjectImageSlideshow from './ProjectImageSlideshow';

const ProjectsOverviewGrid = React.memo(function ProjectsOverviewGrid({ category, projects, onOpenInquiry }) {
  return (
    <section className="projects-grid-overview-section" id="all-projects-grid">
      <div className="container">
        {/* Section Header */}
        <div className="grid-overview-header">
          <div className="grid-overview-badge">
            <i className={category.icon}></i>
            <span>{category.label} Directory</span>
          </div>
          <h2 className="grid-overview-title">
            All Projects Index & Technology Overview
          </h2>
          <p className="grid-overview-subtitle">
            Complete architectural matrix and technology stacks across all deployed systems.
          </p>
        </div>

        {/* Clean Responsive Grid */}
        <div className="projects-simple-grid">
          {projects.map((project, index) => (
            <article key={project.id} className="project-grid-card">
              {/* Card Image Banner with 1.5-Second Auto Slideshow */}
              <div className="grid-card-media">
                <ProjectImageSlideshow
                  images={project.images || (project.image ? [project.image] : [])}
                  fallback={project.image || '/assets/images/projects/lithin-main.jpg'}
                  alt={project.title}
                  className="grid-slideshow-container"
                  imgClassName="grid-card-img"
                  interval={1500}
                />
                <span className="grid-card-pill">
                  {project.tagPill}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid-card-body">
                {/* Project Heading */}
                <h3 className="grid-card-title">{project.title}</h3>

                {/* What is What: Clean Bullet Points */}
                {project.features && (
                  <ul className="grid-card-bullets">
                    {project.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <span className="grid-bullet-dot">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Chips */}
                {project.techStack && (
                  <div className="grid-card-tech">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="grid-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Action */}
                <div className="grid-card-actions">
                  {project.hasLiveLink && project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-grid-action live"
                    >
                      <span>Live Demo</span>
                      <i className="ri-external-link-line"></i>
                    </a>
                  ) : project.portalDomain ? (
                    <div className="grid-private-tag">
                      <i className="ri-shield-keyhole-line"></i>
                      <span>Authorized Software</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenInquiry &&
                        onOpenInquiry({
                          name: project.title,
                          type: project.demoModalTag || 'project-details',
                        })
                      }
                      className="btn-grid-action inquire"
                    >
                      <span>Request Live Demo</span>
                      <i className="ri-arrow-right-up-line"></i>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProjectsOverviewGrid;
