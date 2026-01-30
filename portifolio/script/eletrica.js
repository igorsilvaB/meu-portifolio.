function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openServiceModal(serviceName) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  const serviceDetails = {
    'Instalações Residenciais': {
      description: 'Realizamos instalações elétricas completas para residências com os mais altos padrões de qualidade e segurança.',
      benefits: [
        'Projeto elétrico personalizado',
        'Instalação de quadros de distribuição modernos',
        'Pontos de tomadas e iluminação',
        'Sistema de aterramento adequado',
        'Instalação de disjuntores e DPS',
        'Certificado de conformidade'
      ],
      price: 'A partir de R$ 3.500,00'
    },
    'Instalações Comerciais': {
      description: 'Projetos elétricos para estabelecimentos comerciais com infraestrutura robusta e eficiente.',
      benefits: [
        'Dimensionamento de carga adequado',
        'Rede elétrica trifásica',
        'Iluminação de emergência',
        'Sistema de alarme e CFTV',
        'Infraestrutura para data center',
        'Laudo técnico e ART'
      ],
      price: 'A partir de R$ 8.000,00'
    },
    'Instalações Industriais': {
      description: 'Soluções elétricas para ambientes industriais com alta demanda e necessidades específicas.',
      benefits: [
        'Painéis elétricos industriais',
        'Barramentos de distribuição',
        'Instalação de transformadores',
        'Sistema de automação',
        'Manutenção preventiva',
        'Documentação técnica completa'
      ],
      price: 'Consulte-nos para orçamento'
    },
    'Energia Solar': {
      description: 'Instalação de sistemas fotovoltaicos para geração de energia limpa e economia na conta de luz.',
      benefits: [
        'Projeto solar dimensionado',
        'Instalação de painéis fotovoltaicos',
        'Inversor solar de qualidade',
        'Estruturas de fixação',
        'Homologação na concessionária',
        'Monitoramento via app'
      ],
      price: 'A partir de R$ 15.000,00'
    },
    'Manutenção Preventiva': {
      description: 'Inspeções regulares para garantir o bom funcionamento e segurança das instalações elétricas.',
      benefits: [
        'Inspeção visual completa',
        'Medição de tensão e corrente',
        'Teste de disjuntores',
        'Análise termográfica',
        'Limpeza de quadros elétricos',
        'Relatório técnico detalhado'
      ],
      price: 'A partir de R$ 350,00'
    }
  };
  
  const service = serviceDetails[serviceName];
  
  if (service) {
    modalTitle.textContent = serviceName;
    modalBody.innerHTML = `
      <p>${service.description}</p>
      <h3 style="margin-top: 24px; margin-bottom: 16px; font-size: 20px;">O que está incluso:</h3>
      <ul style="list-style: none; padding: 0;">
        ${service.benefits.map(benefit => `
          <li style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #333;">
            <span style="color: #FFB800; font-weight: bold; margin-right: 8px;">✓</span>${benefit}
          </li>
        `).join('')}
      </ul>
      <div style="margin-top: 24px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
        <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Investimento</p>
        <p style="font-size: 24px; font-weight: 700; color: #FFB800;">${service.price}</p>
      </div>
      <button onclick="closeModal(); scrollToSection('contato')" style="width: 100%; margin-top: 24px; padding: 14px; background-color: #FFB800; color: #1a1a1a; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer;">
        Solicitar Orçamento
      </button>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function openEmergencyModal() {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = 'Atendimento de Emergência 24h';
  modalBody.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 80px; margin-bottom: 20px;">⚡</div>
      <p style="font-size: 18px; margin-bottom: 24px; color: #666;">
        Nossa equipe está pronta para atender você a qualquer momento!
      </p>
      <div style="background-color: #FF3B30; color: white; padding: 30px; border-radius: 12px; margin-bottom: 24px;">
        <p style="font-size: 16px; margin-bottom: 12px;">Ligue Agora:</p>
        <p style="font-size: 32px; font-weight: 700;">(11) 3000-0000</p>
        <p style="font-size: 16px; margin-top: 12px;">WhatsApp: (11) 99999-9999</p>
      </div>
      <p style="font-size: 14px; color: #666;">
        Atendemos emergências como:<br>
        Curto-circuito • Falta de energia • Disjuntores queimados<br>
        Fios expostos • Choque elétrico • Outros problemas urgentes
      </p>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function viewProject(projectName) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  const projectDetails = {
    'Residencial Jardins': {
      description: 'Instalação elétrica completa em residência de alto padrão com 250m² incluindo sistema de automação residencial.',
      details: [
        'Quadro de distribuição com 48 disjuntores',
        'Sistema de iluminação LED em todos os ambientes',
        'Automação de persianas e iluminação',
        '50 pontos de tomada',
        'Infraestrutura para home theater',
        'Sistema de segurança integrado'
      ],
      duration: '45 dias',
      year: '2025'
    },
    'Escritório Tech': {
      description: 'Projeto elétrico completo para escritório corporativo com infraestrutura moderna e eficiente.',
      details: [
        'Rede elétrica estabilizada para TI',
        '80 estações de trabalho',
        'Iluminação automatizada',
        'Sistema de ar-condicionado VRF',
        'Infraestrutura de rede cabeada',
        'Sala de servidores climatizada'
      ],
      duration: '60 dias',
      year: '2025'
    },
    'Solar Residence': {
      description: 'Sistema fotovoltaico residencial com 10kWp de potência, gerando economia de até 90% na conta de luz.',
      details: [
        '32 painéis solares 330W',
        'Inversor solar 10kW',
        'Estruturas de fixação em telhado',
        'Sistema de monitoramento online',
        'Homologação na concessionária',
        'Geração média de 1.300 kWh/mês'
      ],
      duration: '15 dias',
      year: '2025'
    },
    'Indústria Mecânica': {
      description: 'Infraestrutura elétrica industrial completa para galpão de 2000m² com alta demanda de energia.',
      details: [
        'Transformador 300 kVA',
        '5 painéis elétricos principais',
        'Barramentos de distribuição',
        'Pontos de força para máquinas',
        'Iluminação industrial LED',
        'Sistema de aterramento completo'
      ],
      duration: '90 dias',
      year: '2024'
    }
  };
  
  const project = projectDetails[projectName];
  
  if (project) {
    modalTitle.textContent = projectName;
    modalBody.innerHTML = `
      <p style="font-size: 16px; color: #666; line-height: 1.8; margin-bottom: 24px;">${project.description}</p>
      
      <h3 style="font-size: 20px; margin-bottom: 16px;">Escopo do Projeto:</h3>
      <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
        ${project.details.map(detail => `
          <li style="padding: 10px 0; border-bottom: 1px solid #e9ecef; color: #333;">
            <span style="color: #FFB800; font-weight: bold; margin-right: 8px;">✓</span>${detail}
          </li>
        `).join('')}
      </ul>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
          <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Duração</p>
          <p style="font-size: 20px; font-weight: 700; color: #FFB800;">${project.duration}</p>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
          <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Ano</p>
          <p style="font-size: 20px; font-weight: 700; color: #FFB800;">${project.year}</p>
        </div>
      </div>
      
      <button onclick="closeModal(); scrollToSection('contato')" style="width: 100%; padding: 14px; background-color: #FFB800; color: #1a1a1a; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer;">
        Quero um Projeto Assim
      </button>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em até 2 horas úteis.');
      
      contactForm.reset();
    });
  }

  window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
      closeModal();
    }
  });

  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      scrollToSection(sectionId);
    });
  });

  const emergencyBtn = document.querySelector('.btn-emergency');
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', openEmergencyModal);
  }
});

window.toggleMenu = toggleMenu;
window.scrollToSection = scrollToSection;
window.openServiceModal = openServiceModal;
window.openEmergencyModal = openEmergencyModal;
window.viewProject = viewProject;
window.closeModal = closeModal;
