// Importações necessárias do Angular e RxJS
import { Component, OnInit, inject, OnDestroy } from '@angular/core'; // Component: decorator para criar componente, OnInit: interface para inicialização, inject: função para injeção de dependências, OnDestroy: interface para limpeza
import { Router } from '@angular/router'; // Router: serviço para navegação entre rotas
import { AuthService } from '../../service/auth'; // Serviço de autenticação personalizado
import { CommonModule } from '@angular/common'; // Módulo comum do Angular (ngIf, ngFor, etc)
import { FormsModule } from '@angular/forms'; // Módulo para formulários (ngModel)
import { RawgService } from '../../service/rawg'; // Serviço para buscar dados da API RAWG
import { Subject, Subscription, of } from 'rxjs'; // Subject: observable para emitir valores, Subscription: para gerenciar assinaturas, of: cria observable de valores
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators'; // Operadores RxJS para manipulação de streams

// Decorator que define o componente
@Component({
  selector: 'app-header', // Seletor CSS para usar o componente
  imports: [CommonModule, FormsModule], // Módulos importados (standalone components)
  templateUrl: './header.html', // Caminho para o template HTML
  styleUrl: './header.css', // Caminho para o arquivo de estilos
  standalone: true // Indica que é um componente standalone (não precisa de módulo)
})
// Classe do componente que implementa OnInit e OnDestroy para lifecycle hooks
export class Header implements OnInit, OnDestroy {
  // Injeção de dependências usando a função inject() (nova forma do Angular)
  router = inject(Router); // Serviço de roteamento para navegação
  authService = inject(AuthService); // Serviço de autenticação
  rawgService = inject(RawgService); // Serviço para buscar jogos

  // Propriedades do componente
  isLoggedIn = false; // Flag para verificar se usuário está logado
  username: string | null = null; // Nome do usuário logado (pode ser null)
  searchQuery = ''; // Texto da busca atual
  searchResults: any[] = []; // Array para armazenar resultados da busca
  isLoading = false; // Flag para mostrar estado de carregamento
  searchSubject = new Subject<string>(); // Subject para gerenciar buscas com debounce
  private searchSubscription!: Subscription; // Assinatura da busca para poder cancelar depois

  // Método chamado quando o componente é inicializado
  ngOnInit() {
    // Verifica se usuário está logado usando o serviço de autenticação
    this.isLoggedIn = this.authService.isLoggedIn();
    // Se estiver logado, obtém o nome do usuário
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }

    // Configura a assinatura para busca com debounce (evita chamadas excessivas)
    this.searchSubscription = this.searchSubject.pipe(
      // Aguarda 300ms após o usuário parar de digitar antes de fazer a busca
      debounceTime(300),
      // Só executa a busca se o texto for diferente do anterior  
      distinctUntilChanged(),
      // Troca para um novo observable (switchMap) para cancelar buscas anteriores
      switchMap(query => {
        // Se a query estiver vazia, limpa os resultados e retorna observable vazio
        if (!query.trim()) {
          this.searchResults = [];
          return of({ results: [] }); // Retorna um observable vazio com estrutura esperada
        }
        // Ativa o estado de carregamento
        this.isLoading = true;
        // Faz a chamada para o serviço de busca e trata erros
        return this.rawgService.searchGames(query).pipe(
          // Captura e trata erros na busca
          catchError(err => {
            console.error('Erro ao buscar jogos:', err); // Log do erro
            this.isLoading = false; // Desativa carregamento
            this.searchResults = []; // Limpa resultados
            return of({ results: [] }); // Retorna observable vazio em caso de erro
          })
        );
      })
    // Assina o observable para receber os resultados
    ).subscribe((data: any) => {
      this.isLoading = false; // Desativa estado de carregamento
      this.searchResults = data.results || []; // Armazena resultados (ou array vazio se undefined)
    });
  }

  // MÉTODO ADICIONADO - Navega para home conforme status de login
  navigateToHome() {
    // Verifica se usuário está logado através do serviço de autenticação
    if (this.authService.isLoggedIn()) {
      // Se logado, navega para a página home de usuário logado
      this.router.navigate(['/home-logado']);
    } else {
      // Se não logado, navega para a página home padrão
      this.router.navigate(['/']);
    }
  }

  // Método chamado quando o texto da busca muda
  onSearchChange() {
    // Emite o novo valor para o searchSubject (aciona a busca com debounce)
    this.searchSubject.next(this.searchQuery);
  }

  // Método chamado quando usuário submete a busca (enter ou botão)
  onSearchSubmit() {
    // Verifica se há texto para buscar
    if (this.searchQuery.trim()) {
      // Navega para a página de resultados com a query como parâmetro
      this.router.navigate(['/search-results', this.searchQuery.trim()]);
      this.searchQuery = ''; // Limpa o campo de busca
      this.searchResults = []; // Limpa as sugestões de busca
    }
  }

  // Método chamado quando usuário clica em uma sugestão de busca
  selectSuggestion(gameName: string) {
    // Navega para página de resultados com o nome do jogo selecionado
    this.router.navigate(['/search-results', gameName]);
    this.searchQuery = ''; // Limpa o campo de busca
    this.searchResults = []; // Limpa as sugestões
  }

  // Método para logout do usuário
  logout() {
    // Chama o método logout do serviço de autenticação
    this.authService.logout();
    // Navega para a página inicial após logout
    this.router.navigate(['/']);
  }

  // Método para navegar para página de login
  onTologin() {
    this.router.navigate(['/login']); // Navega para rota de login
  }

  // Método para navegar para página de cadastro
  onTocadastro() {
    this.router.navigate(['/cadastro']); // Navega para rota de cadastro
  }

  // Método para navegar para página sobre
  onTosobre() {
    this.router.navigate(['/sobre']); // Navega para rota sobre
  }

  // Método para navegar para página de gêneros
  onTogeneros() {
    this.router.navigate(['/genres']); // Navega para rota de gêneros
  }

  // Método chamado quando o componente é destruído (limpeza)
  ngOnDestroy() {
    // Verifica se existe assinatura ativa e a cancela para evitar memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe(); // Cancela a assinatura da busca
    }
  }
}