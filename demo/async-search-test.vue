<template>
  <div class="async-search-test">
    <div class="container">
      <h1>Teste de Busca Assíncrona - Vue Treeselect</h1>
      
      <div class="test-section">
        <h2>Configuração</h2>
        <div class="config">
          <label>
            <input type="checkbox" v-model="useCache" />
            Usar Cache de Opções
          </label>
          <label>
            <input type="checkbox" v-model="openOnFocus" />
            Abrir ao Focar
          </label>
          <label>
            <input type="checkbox" v-model="openOnClick" />
            Abrir ao Clicar
          </label>
        </div>
      </div>

      <div class="test-section">
        <h2>Componente Treeselect</h2>
        <vue-treeselect
          ref="treeselectRef"
          v-model="selectedValue"
          :async="true"
          :load-options="loadOptions"
          :default-options="defaultOptions"
          :cache-options="useCache"
          :searchable="true"
          :open-on-focus="openOnFocus"
          :open-on-click="openOnClick"
          no-options-text="Nenhuma opção disponível"
          no-results-text="Nenhum resultado encontrado"
          placeholder="Digite para pesquisar objetos..."
          loading-text="Carregando..."
          search-prompt-text="Digite para pesquisar..."
          :clear-on-select="true"
          class="treeselect-test"
        >
          <template #value-label="{ node }">
            <span v-if="loading">
              Carregando...
            </span>
            <span v-else>
              {{ node.label }}
            </span>
          </template>
        </vue-treeselect>
      </div>

      <div class="test-section">
        <h2>Informações</h2>
        <div class="info-box">
          <div><strong>Valor selecionado:</strong> {{ selectedValue || 'Nenhum' }}</div>
          <div v-if="selectedRaw" class="raw-data">
            <strong>Dados completos:</strong>
            <pre>{{ JSON.stringify(selectedRaw, null, 2) }}</pre>
          </div>
          <div v-if="loading" class="status loading">⏳ Carregando...</div>
          <div v-if="error" class="status error">❌ Erro: {{ error }}</div>
          <div v-if="lastSearchQuery" class="status">
            <strong>Última busca:</strong> "{{ lastSearchQuery }}"
          </div>
          <div class="status">
            <strong>Total de opções carregadas:</strong> {{ loadedOptionsCount }}
          </div>
        </div>
      </div>

      <div class="test-section">
        <h2>Logs</h2>
        <div class="logs">
          <div 
            v-for="(log, index) in logs" 
            :key="index" 
            :class="['log-entry', log.type]"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
        <button @click="clearLogs" class="btn-clear">Limpar Logs</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'AsyncSearchTest',
  
  setup() {
    // Estado do componente
    const selectedValue = ref(null);
    const selectedRaw = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const defaultOptions = ref([]);
    const loadedOptions = ref([]);
    const lastSearchQuery = ref('');
    const logs = ref([]);
    const treeselectRef = ref(null);
    
    // Configurações
    const useCache = ref(false);
    const openOnFocus = ref(true);
    const openOnClick = ref(true);
    
    // Token de autenticação
    const API_TOKEN = '';
    const API_BASE_URL = '';
    
    // Computed
    const loadedOptionsCount = computed(() => loadedOptions.value.length);
    
    // Função para adicionar log
    const addLog = (message, type = 'info') => {
      const time = new Date().toLocaleTimeString();
      logs.value.unshift({ time, message, type });
      if (logs.value.length > 50) {
        logs.value = logs.value.slice(0, 50);
      }
    };
    
    const clearLogs = () => {
      logs.value = [];
    };
    
    // Função para fazer requisição à API
    const fetchObjetos = async (filter = '') => {
      const url = filter 
        ? `${API_BASE_URL}?filter=${encodeURIComponent(filter)}`
        : API_BASE_URL;
      
      addLog(`Fazendo requisição: ${url}`, 'request');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Assumindo que a resposta tem estrutura { data: { data: [...] } }
      const objetos = result?.data?.data || result?.data || result || [];
      
      addLog(`Resposta recebida: ${objetos.length} objetos`, 'success');
      
      return objetos;
    };
    
    // Função para converter objetos em opções do treeselect
    const makeOptions = (objetos) => {
      return objetos.map((objeto) => {
        return {
          id: objeto.id,
          label: objeto.descricao || objeto.label || `Objeto ${objeto.id}`,
          raw: objeto,
        };
      });
    };
    
    // Função loadOptions para o vue-treeselect
    const loadOptions = ({ action, searchQuery, callback }) => {
      if (!callback) {
        addLog('ERRO: callback não fornecido!', 'error');
        return;
      }
      
      // Usar uma função assíncrona interna para fazer a requisição
      (async () => {
        try {
          loading.value = true;
          error.value = null;
          lastSearchQuery.value = searchQuery || '';
          
          addLog(`loadOptions chamado: action=${action}, searchQuery="${searchQuery}"`, 'info');
          
          let filter = '';
          // Para ASYNC_SEARCH, usar o searchQuery como filtro
          if (action === 'ASYNC_SEARCH' && searchQuery) {
            filter = searchQuery;
          }
          // Para LOAD_ROOT_OPTIONS, não passar filtro (carregar todos)
          
          const objetos = await fetchObjetos(filter);
          const options = makeOptions(objetos);
          loadedOptions.value = options;
          
          addLog(`Opções processadas: ${options.length} opções`, 'success');
          
          // IMPORTANTE: Sempre chamar o callback, mesmo quando não há resultados
          // O vue-treeselect precisa receber um array (mesmo que vazio) para saber
          // que a busca foi concluída e parar de mostrar "Carregando..."
          const finalOptions = Array.isArray(options) ? options : [];
          
          addLog(`Chamando callback com ${finalOptions.length} opções`, 'info');
          callback(null, finalOptions);
          addLog('✅ Callback chamado com sucesso!', 'success');
          
          loading.value = false;
        } catch (err) {
          error.value = err.message || 'Erro ao carregar opções';
          addLog(`ERRO: ${err.message}`, 'error');
          
          // IMPORTANTE: Sempre chamar o callback mesmo em caso de erro
          // Passar um array vazio como segundo argumento para indicar que não há opções
          callback(err, []);
          
          loading.value = false;
        }
      })();
      
      // Não retornar nada (ou retornar undefined) para que o vue-treeselect
      // não trate como Promise e chame o callback automaticamente
      return undefined;
    };
    
    // Watcher para atualizar selectedRaw quando selectedValue mudar
    watch(selectedValue, () => {
      if (selectedValue.value) {
        const option = loadedOptions.value.find(opt => opt.id === selectedValue.value);
        selectedRaw.value = option?.raw || null;
        if (option) {
          addLog(`Opção selecionada: ${option.label} (ID: ${option.id})`, 'info');
        }
      } else {
        selectedRaw.value = null;
      }
    });
    
    return {
      selectedValue,
      selectedRaw,
      loading,
      error,
      defaultOptions,
      loadedOptions,
      lastSearchQuery,
      loadedOptionsCount,
      logs,
      treeselectRef,
      useCache,
      openOnFocus,
      openOnClick,
      loadOptions,
      clearLogs,
    };
  }
};
</script>

<style scoped>
.async-search-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

h1 {
  color: #2c3e50;
  margin-top: 0;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

h2 {
  color: #34495e;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.config {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.config label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.config input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.treeselect-test {
  width: 100%;
  max-width: 600px;
}

.info-box {
  background: white;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.info-box > div {
  margin-bottom: 10px;
}

.info-box > div:last-child {
  margin-bottom: 0;
}

.raw-data {
  margin-top: 15px;
}

.raw-data pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.status {
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 10px;
}

.status.loading {
  background: #e3f2fd;
  color: #1976d2;
}

.status.error {
  background: #ffebee;
  color: #c62828;
}

.logs {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 15px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.log-entry {
  padding: 4px 0;
  border-bottom: 1px solid #333;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-entry.error {
  color: #f48771;
}

.log-entry.success {
  color: #4ec9b0;
}

.log-entry.request {
  color: #569cd6;
}

.log-entry.info {
  color: #9cdcfe;
}

.log-time {
  color: #808080;
  margin-right: 10px;
}

.log-message {
  word-break: break-word;
}

.btn-clear {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-clear:hover {
  background: #c82333;
}
</style>

