<template>
    <div>
        <div style="margin-top: 100px; margin-left: 100px; max-width: 300px;">
        <vue-treeselect
            :multiple="true"
            :options="[treeData]"
            noResultsText="No results..."
            placeholder="Select items..."
            v-model="selected"
            :appendToBody="true"
            :default-expand-level="0"
            :autoSelectDescendants="true"
            :autoDeselectDescendants="true"
            :flat="true"
            :searchable="false"
            :show-count="true"
        >
        </vue-treeselect>

        Not appended to body:
        <vue-treeselect
            :multiple="false"
            placement="bottom"
            :appendToBody="false"
            :options="[treeData]"
            noResultsText="No results..."
            placeholder="Select items..."
            v-model="selected4"
            :default-expand-level="0"
            :autoSelectDescendants="true"
            :autoDeselectDescendants="true"
            :flat="true"
            :searchable="false"
            :show-count="true"

        :open-on-click="true"
        :open-on-focus="true"
        :clear-on-select="true"
        :isDefaultExpanded="true"
        :always-open="false"
        :disabled="read_only"
        :disableFuzzyMatching="true"
        :defaultExpandLevel="expandLevel"
        class="tree-select"
        :close-on-select="true"
        :maxHeight="250"
        open-direction="auto"
        >
        </vue-treeselect>
        </div>
        <div>
            Selected: {{selected}}
        </div>

        Append to body:

        <div style="margin-top: 100px; margin-left: 100px; max-width:300px;">
        <vue-treeselect
            :multiple="false"
            :options="[treeData]"
            placement="top"
            noResultsText="No results..."
            placeholder="Select items..."
            v-model="selected2"

            :appendToBody="true"
            :default-expand-level="0"
            :autoSelectDescendants="true"
            :autoDeselectDescendants="true"
            :flat="true"
            :searchable="false"
            :show-count="true"

            :open-on-click="true"
            :open-on-focus="true"
            :clear-on-select="true"
            :isDefaultExpanded="true"
            :always-open="false"
            :disableFuzzyMatching="true"
            :defaultExpandLevel="999"
            class="tree-select"
            :close-on-select="false"
            :maxHeight="250"
            open-direction="auto"
        >
        </vue-treeselect>
        </div>

        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <div style="margin-top: 100px; margin-left: 100px; max-width:300px;">
        <vue-treeselect
            :multiple="true"
            :options="[treeData]"
            placement="top"
            noResultsText="No results..."
            placeholder="Select items..."
            v-model="selected3"

            :appendToBody="true"
            :default-expand-level="0"
            :autoSelectDescendants="true"
            :autoDeselectDescendants="true"
            :flat="true"
            :searchable="false"
            :show-count="true"

            :open-on-click="true"
            :open-on-focus="true"
            :clear-on-select="true"
            :isDefaultExpanded="true"
            :always-open="false"
            :disableFuzzyMatching="true"
            :defaultExpandLevel="999"
            class="tree-select"
            :close-on-select="false"
            :maxHeight="250"
            open-direction="auto"
        >
        </vue-treeselect>
        </div>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
 
        <vue-treeselect 
        v-model="selected4"
        :options="secretariasData" 
        :auto-select-descendants="false"
        :auto-deselect-descendants="false"  
        auto-select-first   
    />

    {{ selected4 }}

    <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
    </div>
</template>
<script>
import { defineComponent,ref,reactive } from 'vue';

export default defineComponent({

    setup() {

        let selected = ref([2,1]);
        let selected2 = ref([]);
        let selected3 = ref([]);
        let selected4 = ref([]);
        let treeOrientation = ref("0");
        let treeData = reactive({
            label: 'root',
            expand: true,
            id: 1,
            children: [
                { label: 'child 1', id: 2, },
                { label: 'child 2', id: 3, },
                { 
                    label: 'subparent 1', 
                    id: 4, 
                    expand: false, 
                    isUnselectable: true,
                    children: [
                        { label: 'subchild 1', id: 5 },
                        {  
                            label: 'subchild 2', 
                            id: 6, 
                            expand: false, 
                            children: [
                                { label: 'subchild 11', id: 7 },
                                { label: 'subchild 11', id: 8 },
                                { label: 'subchild 11', id: 9 },
                                { label: 'subchild 11', id: 10 },
                                { label: 'subchild 11', id: 11 },
                                { label: 'subchild 11', id: 12 },
                                { label: 'subchild 11', id: 13 },
                                { label: 'subchild 11', id: 14 },
                                { label: 'subchild 11', id: 15 },
                                { label: 'subchild 22', id: 16 },
                            ]
                        },
                    ]
                },
            ]
        });

        const secretariasData = reactive([
            {
                id: 1,
                label: "Secretaria Municipal de Saúde",
                raw: {
                    id: 1,
                    razaosocial: "SECRETARIA MUNICIPAL DE SAÚDE",
                    unidade_principal_id: null,
                    bloqueio: null,
                    pivot: {
                        id_responsavel: 1,
                        id_secretaria: 1,
                        id: 1,
                        cargo: "Secretário Municipal",
                        portaria: "004/2023",
                        ativo: true,
                        ordenador_despesas: false,
                        secretaria_principal: false,
                    }
                },
                expand: true
            },
            {
                id: 6,
                label: "Secretaria de Obras, Transportes e Serviços Públicos",
                raw: {
                    id: 6,
                    razaosocial: "SECRETARIA DE OBRAS, TRANSPORTES E SERVIÇOS PÚBLICOS",
                    unidade_principal_id: null,
                    bloqueio: null,
                    pivot: {
                        id_responsavel: 1,
                        id_secretaria: 6,
                        id: 2,
                        cargo: "Secretário de Obras",
                        portaria: null,
                        ativo: true,
                        ordenador_despesas: false,
                        secretaria_principal: false,
                    }
                },
                expand: true
            },
            {
                id: 2,
                label: "Secretaria de Administração e Planejamento",
                raw: {
                    id: 2,
                    razaosocial: "Secretaria de Administração e Planejamento",
                    unidade_principal_id: null,
                    bloqueio: null,
                    pivot: {
                        id_responsavel: 1,
                        id_secretaria: 2,
                        id: 3,
                        cargo: "Secretario de Administração",
                        portaria: "Decreto N° 004/2024",
                        ativo: true,
                        ordenador_despesas: true,
                        secretaria_principal: true
                    }
                },
                expand: true,
                children: [
                    {
                        id: 14,
                        label: "Hospital Municipal",
                        raw: {
                            id: 14,
                            razaosocial: "Hospital Municipal",
                            unidade_principal_id: 2,
                            bloqueio: null,
                            pivot: {
                                id_responsavel: 1,
                                id_secretaria: 14,
                                id: 125,
                                cargo: "Teste",
                                portaria: "",
                                ativo: true,
                                ordenador_despesas: false,
                                secretaria_principal: false
                            }
                        },
                        expand: false
                    }
                ]
            },
            {
                id: 3,
                label: "Secretaria Municipal de Educação, Esporte e Cultura",
                raw: {
                    id: 3,
                    razaosocial: "SECRETARIA MUNICIPAL DE EDUCAÇÃO, ESPORTE E CULTURA",
                    unidade_principal_id: null,
                    bloqueio: null,
                    pivot: {
                        id_responsavel: 1,
                        id_secretaria: 3,
                        id: 4,
                        cargo: null,
                        portaria: null,
                        ativo: true,
                        ordenador_despesas: false,
                        secretaria_principal: false
                    }
                },
                expand: true,
                children: [
                    {
                        id: 12,
                        label: "Escola Jõao Sá",
                        raw: {
                            id: 12,
                            razaosocial: "Escola Jõao Sá",
                            unidade_principal_id: 3,
                            bloqueio: null,
                            pivot: {
                                id_responsavel: 1,
                                id_secretaria: 12,
                                id: 123,
                                cargo: "Vre",
                                portaria: "",
                                ativo: true,
                                ordenador_despesas: false,
                                secretaria_principal: false
                            }
                        },
                        expand: false
                    },
                    {
                        id: 13,
                        label: "Escola José da Silva",
                        raw: {
                            id: 13,
                            razaosocial: "Escola José da Silva",
                            unidade_principal_id: 3,
                            bloqueio: null,
                            pivot: {
                                id_responsavel: 1,
                                id_secretaria: 13,
                                id: 124,
                                cargo: "abc",
                                portaria: "",
                                ativo: true,
                                ordenador_despesas: false,
                                secretaria_principal: false
                            }
                        },
                        expand: false
                    }
                ]
            },
            {
                id: 5,
                label: "Secretaria de Finanças",
                raw: {
                    id: 5,
                    razaosocial: "SECRETARIA DE FINANÇAS",
                    unidade_principal_id: null,
                    bloqueio: null,
                    pivot: {
                        id_responsavel: 1,
                        id_secretaria: 5,
                        id: 5,
                        cargo: null,
                        portaria: null,
                        ativo: true,
                        ordenador_despesas: false,
                        secretaria_principal: false
                    }
                },
                expand: true
            },
            {
                id: 7,
                label: "Secretaria Municipal de Assistência Social",
                raw: {
                    id: 7,
                    razaosocial: "SECRETARIA MUNICIPAL DE ASSISTÊNCIA SOCIAL",
                    unidade_principal_id: null,
                    bloqueio: null,
                    pivot: {
                        id_responsavel: 1,
                        id_secretaria: 7,
                        id: 6,
                        cargo: null,
                        portaria: null,
                        ativo: true,
                        ordenador_despesas: false,
                        secretaria_principal: false
                    }
                },
                expand: true,
                children: [
                    {
                        id: 8,
                        label: "Secretaria Municipal de Agricultura e Meio Ambiente",
                        raw: {
                            id: 8,
                            razaosocial: "SECRETARIA MUNICIPAL DE AGRICULTURA E MEIO AMBIENTE",
                            unidade_principal_id: 7,
                            bloqueio: null, 
                        }
                    }
                ]
            }
        ]);


        return {
            treeData,
            selected,
            selected2,
            selected3,
            selected4,
            secretariasData,
        }
    }
})

</script>
