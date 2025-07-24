import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Lgpd } from '../../pages/lgpd/lgpd'; // Importar o componente LGPD

@Component({
  selector: 'app-footer',
  imports: [Lgpd], // Adicionar Lgpd aos imports
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  router = inject(Router);
  showLgpdModal: boolean = false; // Propriedade para controlar a visibilidade do modal

  // Removido verLGPD() pois agora será um modal

  onTosobre(){
    this.router.navigate(['/sobre']);
  }

  onSocialClick(platform: string) {
    console.log(`Clicou no ícone social: ${platform}`);
    // Aqui você pode adicionar a lógica para redirecionar para a rede social
    // Ex: window.open(`https://${platform}.com`, '_blank');
  }

  onInstitutionalClick(section: string) {
    console.log(`Clicou em Institucional: ${section}`);
    if (section === 'sobre') {
      this.onTosobre();
    } else if (section === 'seguranca') {
      // Lógica para a página de segurança
    }
  }

  onHelpClick(section: string) {
    console.log(`Clicou em Ajuda: ${section}`);
    if (section === 'privacidade') {
      this.showLgpdModal = true; // Abre o modal LGPD
    } else if (section === 'suporte') {
      // Lógica para a página de suporte
    } else if (section === 'termos') {
      // Lógica para a página de termos de uso
    } else if (section === 'procon') {
      // Lógica para a página do Procon-BA
    }
  }

  closeLgpdModal() {
    this.showLgpdModal = false; // Fecha o modal LGPD
  }
}
