<template>
  <div class="defectClass-body">
    <!-- 缺陷信息数据表格 -->
    <div class="defect-info">
      <el-card class="public-card">
        <div slot="header" class="card-header clearfix">
          <span>缺陷类型输入</span>
        </div>
        <div class="query-card-content">
          <!-- 缺陷信息数据表格 -->
          <vxe-toolbar perfect>
            <template #buttons>
              <vxe-button
                icon="fa fa-plus"
                status="primary"
                @click="insertDefect"
              >
                新增
              </vxe-button>
              <vxe-button
                icon="fa fa-trash-o"
                status="danger"
                @click="removeDefect"
              >
                移除
              </vxe-button>

              <vxe-button
                icon="fa fa-save"
                status="success"
                @click="saveDefectData"
                :disabled="saveIsDisabled"
              >
                保存排序
              </vxe-button>

              <vxe-button
                icon="iconfont icon-tuichu1"
                status="danger"
                @click="closeWidow"
              >
                关闭程序
              </vxe-button>
            </template>
          </vxe-toolbar>

          <div class="xTable-content" ref="xTableContent">
            <vxe-table
              ref="xTable"
              show-overflow
              keep-source
              auto-resize
              :height="defectTableHeight"
              highlight-hover-row
              align="center"
              :highlight-current-row="isHightLight"
              :data="tableData"
              @cell-click="defectCellClick"
              class="sortable-row-demo"
              :scroll-y="{ enabled: false }"
            >
              <vxe-table-column width="40">
                <template #default>
                  <span class="drag-btn">
                    <i class="vxe-icon--menu"></i>
                  </span>
                </template>
                <template #header>
                  <vxe-tooltip
                    v-model="showHelpTip1"
                    content="按住后可以上下拖动排序！"
                    enterable
                  >
                    <i
                      class="vxe-icon--question"
                      @click="showHelpTip1 = !showHelpTip1"
                    ></i>
                  </vxe-tooltip>
                </template>
              </vxe-table-column>
              <vxe-table-column type="checkbox" width="40"></vxe-table-column>
              <vxe-table-column type="seq" width="40"></vxe-table-column>
              <vxe-table-column
                field="defect_name"
                title="缺陷名称"
              ></vxe-table-column>
              <vxe-table-column
                field="defect_priority"
                title="优先级"
              ></vxe-table-column>
              <vxe-table-column
                field="defect_code"
                title="缺陷代码"
              ></vxe-table-column>
              <vxe-table-column
                field="defect_grade"
                title="缺陷等级"
              ></vxe-table-column>
              <vxe-table-column
                field="defect_type"
                title="缺陷类型"
              ></vxe-table-column>
              <vxe-table-column field="defect_isEnable" title="是否开启">
                <template #default="{ row }">
                  {{ row.defect_isEnable === 0 ? "关闭" : "开启" }}
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="defect_note"
                title="备注"
              ></vxe-table-column>

              <vxe-table-column title="操作" width="80">
                <template #default="{ row }">
                  <template>
                    <vxe-button status="primary" @click="editDefectRow(row)">
                      编辑
                    </vxe-button>
                  </template>
                </template>
              </vxe-table-column>

              <template #empty>
                <span style="color: red">
                  <!-- <img src="../../assets/img1.gif" /> -->
                  <p>不用再看了，没有更多数据了！</p>
                </span>
              </template>
            </vxe-table>

            <vxe-modal
              ref="defectxModal"
              v-model="showDefectModel"
              :title="defectModalTitle"
              width="800"
              resize
              :lock-view="false"
              :lock-scroll="false"
              destroy-on-close
            >
              <template #default>
                <vxe-form
                  :data="defectFormData"
                  :rules="defectFormRules"
                  title-align="right"
                  title-width="100"
                  @submit="submitDefectEvent"
                >
                  <vxe-form-item
                    title="主要缺陷信息"
                    span="24"
                    title-align="left"
                    title-width="200px"
                    :title-prefix="{ icon: 'fa fa-address-card-o' }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="缺陷名称"
                    field="defectName"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { placeholder: '请输入缺陷名称' },
                    }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="优先级"
                    field="defectPriority"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { type: 'number', placeholder: '请输入优先级' },
                    }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="缺陷代码"
                    field="defectCode"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { placeholder: '请输入缺陷代码' },
                    }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="缺陷等级"
                    field="defectGrade"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { placeholder: '请输入缺陷等级' },
                    }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="缺陷类型"
                    field="defectType"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { type: 'number', placeholder: '请输入缺陷类型' },
                    }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="是否开启"
                    field="defectIsEnable"
                    span="12"
                    :item-render="{}"
                  >
                    <template #default="{ data }">
                      <vxe-switch
                        v-model="data.defectIsEnable"
                        open-label="开启"
                        close-label="关闭"
                      ></vxe-switch>
                    </template>
                  </vxe-form-item>
                  <vxe-form-item
                    title="备注"
                    field="defectNote"
                    span="24"
                    :item-render="{}"
                  >
                    <template #default="{ data }">
                      <vxe-textarea
                        v-model="data.defectNote"
                        placeholder="请输入备注信息"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                      ></vxe-textarea>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item align="center" span="24">
                    <template #default>
                      <vxe-button type="submit" status="primary">
                        保存
                      </vxe-button>
                      <vxe-button type="reset">重置</vxe-button>
                      <vxe-button @click="$refs.defectxModal.close()">
                        取消
                      </vxe-button>
                    </template>
                  </vxe-form-item>
                </vxe-form>
              </template>
            </vxe-modal>
          </div>
          <!-- 缺陷信息数据表格 -->
        </div>
      </el-card>
    </div>
    <!-- 缺陷信息数据表格 -->

    <!-- 对应条件 -->
    <div class="defect-condition">
      <el-card class="public-card">
        <div slot="header" class="card-header clearfix">
          <span>满足的缺陷条件{{ conditionHeader }}</span>
        </div>
        <div class="query-card-content">
          <!-- 对应条件 -->
          <vxe-toolbar perfect>
            <template #buttons>
              <vxe-button
                icon="fa fa-plus"
                status="primary"
                @click="insertCondition"
                :disabled="conditionIsDisabled"
              >
                新增
              </vxe-button>
              <vxe-button
                icon="fa fa-trash-o"
                status="danger"
                :disabled="conditionIsDisabled"
                @click="removeCondition"
              >
                移除
              </vxe-button>

              <vxe-button
                :disabled="conditionIsDisabled"
                status="info"
                @click="$refs.conditionTable.setAllRowExpand(true)"
              >
                所有行展开
              </vxe-button>

              <vxe-button
                status="info"
                :disabled="conditionIsDisabled"
                @click="$refs.conditionTable.clearRowExpand()"
              >
                关闭所有行展开
              </vxe-button>
            </template>
          </vxe-toolbar>
          <!-- 对应条件 -->

          <!-- 对应表格 -->
          <div class="condition-content" ref="condition">
            <vxe-table
              ref="conditionTable"
              show-overflow
              keep-source
              auto-resize
              :height="conditionTableHeight"
              highlight-hover-row
              align="center"
              highlight-current-row
              :data="conditionData"
              @cell-click="conditionCellClick"
            >
              <vxe-table-column type="checkbox" width="40"></vxe-table-column>
              <vxe-table-column type="expand" width="60">
                <template #content="{ row }">
                  <div
                    v-for="(item, index) in row.condition_attribute"
                    :key="index"
                  >
                    <ul>
                      <li>
                        <span>属性名称：</span>
                        <span style="color: red">{{
                          item.attribute_name
                        }}</span>
                      </li>

                      <li
                        v-if="item.attribute_value || item.attribute_value == 0"
                      >
                        <span>属性值：</span>
                        <span style="color: red">{{
                          item.attribute_value
                        }}</span>
                      </li>

                      <li v-if="item.attribute_min || item.attribute_min == 0">
                        <span>最小值：</span>
                        <span style="color: red">{{ item.attribute_min }}</span>
                      </li>

                      <li v-if="item.attribute_max || item.attribute_max == 0">
                        <span>最大值：</span>
                        <span style="color: red">{{ item.attribute_max }}</span>
                      </li>

                      <li>
                        <span>是否开启：</span>
                        <span style="color: red">{{
                          item.attribute_isEnable === 0 ? "关闭" : "开启"
                        }}</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </vxe-table-column>

              <vxe-table-column type="seq" width="40"></vxe-table-column>

              <vxe-table-column
                field="condition_name"
                title="条件名称"
              ></vxe-table-column>
              <vxe-table-column
                field="condition_index"
                title="条件索引"
              ></vxe-table-column>

              <vxe-table-column field="condition_isEnable" title="是否开启">
                <template #default="{ row }">
                  {{ row.condition_isEnable === 0 ? "关闭" : "开启" }}
                </template>
              </vxe-table-column>

              <vxe-table-column
                field="condition_image"
                title="检出画面"
              ></vxe-table-column>

              <vxe-table-column title="操作" width="150">
                <template #default="{ row }">
                  <vxe-button icon="fa fa-edit" @click="editCondition(row)">
                    编辑
                  </vxe-button>
                </template>
              </vxe-table-column>

              <template #empty>
                <span style="color: red">
                  <!-- <img src="../../assets/img1.gif" /> -->
                  <p>不用再看了，没有更多数据了！</p>
                </span>
              </template>
            </vxe-table>

            <vxe-modal
              ref="xModal"
              v-model="showEdit"
              :title="xModalTitle"
              width="800"
              :height="conditionShowHeight"
              resize
              :lock-view="false"
              :lock-scroll="false"
              destroy-on-close
            >
              <template #default>
                <vxe-form
                  :data="formData"
                  :rules="formRules"
                  title-align="right"
                  title-width="100"
                  @submit="submitEvent"
                >
                  <vxe-form-item
                    title="主要参数信息"
                    span="24"
                    title-align="left"
                    title-width="200px"
                    :title-prefix="{ icon: 'fa fa-address-card-o' }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="条件名称"
                    field="conditionName"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { placeholder: '请输入条件名称' },
                    }"
                  ></vxe-form-item>
                  <vxe-form-item
                    title="条件索引"
                    field="conditionIndex"
                    span="12"
                    :item-render="{
                      name: 'input',
                      attrs: { type: 'number', placeholder: '请输入条件索引' },
                    }"
                  ></vxe-form-item>

                  <vxe-form-item
                    title="检出画面"
                    field="conditionImage"
                    span="12"
                    :item-render="{
                      name: '$select',
                      options: imageList,
                      props: {
                        multiple: true,
                        placeholder: '请选择检出画面(可多选)',
                      },
                    }"
                  ></vxe-form-item>

                  <vxe-form-item
                    title="是否开启"
                    field="conditionIsEnable"
                    span="12"
                    :item-render="{}"
                  >
                    <template #default="{ data }">
                      <vxe-switch
                        v-model="data.conditionIsEnable"
                        open-label="开启"
                        close-label="关闭"
                      ></vxe-switch>
                    </template>
                  </vxe-form-item>

                  <!-- 可选参数信息 -->
                  <vxe-form-item
                    title="可选参数信息"
                    span="24"
                    title-align="left"
                    title-width="200px"
                    :title-prefix="{
                      message: '请填写必填项',
                      icon: 'fa fa-info-circle',
                    }"
                  ></vxe-form-item>

                  <vxe-form-item span="24">
                    <vxe-checkbox
                      v-model="widthShow"
                      content="缺陷宽度"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="heightShow"
                      content="缺陷高度"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="areaShow"
                      content="缺陷面积"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="grayShow"
                      content="缺陷灰度"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="degreeShow"
                      content="缺陷明显程度"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="tierShow"
                      content="缺陷层级"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="measureShow"
                      content="算法尺度"
                    ></vxe-checkbox>
                    <vxe-checkbox
                      v-model="stepShow"
                      content="Step名称"
                    ></vxe-checkbox>
                  </vxe-form-item>

                  <vxe-form-item title="缺陷宽度" span="24" v-if="widthShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <span>最小值-最大值：</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.widthMin"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span>--</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.widthMax"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.widthIsEnable"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item title="缺陷高度" span="24" v-if="heightShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <span>最小值-最大值：</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.heightMin"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span>--</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.heightMax"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.heightIsEnable"
                          size="medium"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item title="缺陷面积" span="24" v-if="areaShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <span>最小值-最大值：</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.areaMin"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span>--</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.areaMax"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.areaIsEnable"
                          size="medium"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item title="缺陷灰度" span="24" v-if="grayShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <span>最小值-最大值：</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.grayMin"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span>--</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.grayMax"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.grayIsEnable"
                          size="medium"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item
                    title="缺陷明显程度"
                    span="24"
                    v-if="degreeShow"
                  >
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <span>最小值-最大值：</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.degreeMin"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span>--</span>
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.degreeMax"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.degreeIsEnable"
                          size="medium"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item title="缺陷层级" span="24" v-if="tierShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <div>
                          <vxe-input
                            width="100"
                            v-model="data.tierNums"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.tierIsEnable"
                          size="medium"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item title="算法尺度" span="24" v-if="measureShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <div>
                          <vxe-input
                            v-model="data.measureNums"
                            placeholder="数值类型"
                            type="number"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.measureIsEnable"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item title="step名称" span="24" v-if="stepShow">
                    <template #default="{ data }">
                      <div class="public-formItem">
                        <div>
                          <vxe-input
                            v-model="data.stepName"
                            placeholder="输入step名称"
                          ></vxe-input>
                        </div>
                        <span style="margin-left: 10px">是否开启：</span>
                        <vxe-switch
                          v-model="data.stepIsEnable"
                          size="medium"
                          open-label="开启"
                          close-label="关闭"
                        ></vxe-switch>
                      </div>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item align="center" span="24">
                    <template #default>
                      <vxe-button type="submit" status="primary">
                        保存
                      </vxe-button>
                      <vxe-button type="reset">重置</vxe-button>
                      <vxe-button @click="$refs.xModal.close()">
                        取消
                      </vxe-button>
                    </template>
                  </vxe-form-item>
                </vxe-form>
              </template>
            </vxe-modal>
          </div>
          <!-- 对应表格 -->
        </div>
      </el-card>
    </div>
    <!-- 对应条件 -->
  </div>
</template>

<script>
import { getConfig, setConfig, killBrowser } from "@/axios/api";
import Sortable from "sortablejs";

export default {
  data() {
    return {
      showHelpTip1: false,

      defectTableHeight: 0,
      tableData: [],
      conditionTableHeight: 0,
      conditionData: [],
      isRemove: false,

      editRowIndex: "",
      conditionIsDisabled: true,
      isHightLight: true,

      sortTableData: [],
      saveIsDisabled: true,

      //缺陷弹窗
      showDefectModel: false,
      defectModalTitle: "缺陷新增&保存",
      defectFormData: {
        defectName: "",
        defectPriority: "",
        defectCode: "",
        defectGrade: "",
        defectType: "",
        defectIsEnable: false,
        defectNote: "",
      },
      defectFormRules: {
        defectName: [{ required: true, message: "请输入缺陷名称" }],
        defectPriority: [{ required: true, message: "请输入缺陷优先级" }],
        defectCode: [{ required: true, message: "请输入缺陷代码" }],
        defectGrade: [{ required: true, message: "请输入缺陷等级" }],
        defectType: [{ required: true, message: "请输入缺陷类型" }],
      },

      //弹出框的选项
      conditionEditRow: "",

      conditionHeader: "",
      conditionShowHeight: 0,
      xModalTitle: "编辑&保存",
      showEdit: false,
      formData: {
        conditionName: "",
        conditionIndex: "",
        conditionIsEnable: false,
        conditionImage: "",

        widthMin: 0,
        widthMax: 0,
        widthIsEnable: false,

        heightMin: 0,
        heightMax: 0,
        heightIsEnable: false,

        areaMin: 0,
        areaMax: 0,
        areaIsEnable: false,

        grayMin: 0,
        grayMax: 0,
        grayIsEnable: false,

        degreeMin: 0,
        degreeMax: 0,
        degreeIsEnable: false,

        tierNums: 0,
        tierIsEnable: false,

        measureNums: 0,
        measureIsEnable: false,

        stepName: "",
        stepIsEnable: false,
      },
      formRules: {
        conditionName: [{ required: true, message: "请输入条件名称" }],
        conditionIndex: [{ required: true, message: "请输入条件索引" }],
        conditionImage: [
          { required: true, message: "请选择检测画面", trigger: "change" },
        ],
      },
      imageList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },
        { label: 6, value: 6 },
        { label: 7, value: 7 },
        { label: 8, value: 8 },
        { label: 9, value: 9 },
      ],
      defectRowIndex: "",

      //显示
      widthShow: false,
      heightShow: false,
      areaShow: false,
      grayShow: false,
      degreeShow: false,
      tierShow: false,
      measureShow: false,
      stepShow: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      //获取数据
      getConfig({})
        .then((res) => {
          let data = res.data;

          this.tableData = data;
        })
        .catch((err) => {
          this.$message.error("请求失败！" + err);
        });

      this.defectTableHeight = this.$refs.xTableContent.clientHeight;
      this.conditionTableHeight = this.$refs.condition.clientHeight;

      this.conditionShowHeight = window.innerHeight - 20;

      window.onresize = () => {
        return (() => {
          this.defectTableHeight = this.$refs.xTableContent.clientHeight;
          this.conditionTableHeight = this.$refs.condition.clientHeight;

          this.conditionShowHeight = window.innerHeight - 20;
        })();
      };
    });
  },

  created() {
    this.rowDrop();
  },
  beforeDestroy() {
    if (this.sortable1) {
      this.sortable1.destroy();
    }
  },

  methods: {
    rowDrop() {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable;
        this.sortable1 = Sortable.create(
          xTable.$el.querySelector(".body--wrapper>.vxe-table--body tbody"),
          {
            handle: ".drag-btn",
            onEnd: ({ newIndex, oldIndex }) => {
              let newData = JSON.parse(JSON.stringify(this.tableData));
              const currRow = newData.splice(oldIndex, 1);

              newData.splice(newIndex, 0, currRow[0]);
              newData.forEach((item, index) => {
                item._XID = index;
                item.newIndex = index;
              });

              this.sortTableData = newData;
              this.saveIsDisabled = false;
            },
          }
        );
      });
    },
    //保存排序按钮
    saveDefectData() {
      // console.log(this.sortTableData);
      //新增过后需要重置缺陷条件表格
      this.conditionIsDisabled = true;
      this.conditionData = [];
      this.isHightLight = false;
      this.conditionHeader = "";

      this.tableData = [];

      //把修改后的数据存入文件中
      setConfig(this.sortTableData)
        .then((res) => {
          let data = res.data;
          if (!data.errCode) {
            this.tableData = data;

            this.sortTableData = [];
            this.saveIsDisabled = true;

            this.$XModal.alert({
              content: "保存排序成功！",
              status: "success",
            });

            setTimeout(() => {
              this.isHightLight = true;
            }, 0);
          }
        })
        .catch((err) => {
          this.$message.error("请求失败!" + err);
        });
    },
    //缺陷类型新增
    insertDefect() {
      //清空数据
      this.defectFormData = {
        defectName: "",
        defectPriority: "",
        defectCode: "",
        defectGrade: "",
        defectType: "",
        defectIsEnable: false,
        defectNote: "",
      };

      this.editRowIndex = "";

      this.defectModalTitle = "缺陷 新增&创建";
      this.showDefectModel = true;
    },
    //缺陷类型移除
    removeDefect() {
      const $table = this.$refs.xTable;
      const selectRecords = $table.getCheckboxRecords();
      if (selectRecords.length) {
        this.$XModal.confirm("您确定要删除选中的数据吗?").then((type) => {
          if (type === "confirm") {
            let newData = JSON.parse(JSON.stringify(this.tableData));
            //将要删除的索引进行获取
            let indexs = [];
            selectRecords.forEach((item) => {
              indexs.push(item.newIndex);
            });
            //倒序排序
            indexs.sort(function (a, b) {
              return b - a;
            });
            //删除选中的数据
            indexs.forEach(function (index) {
              newData.splice(index, 1);
            });

            //赋值_XID
            newData.forEach((item, index) => {
              item._XID = index;
              item.newIndex = index;
            });

            //删除过后需要重置缺陷条件表格
            this.conditionIsDisabled = true;
            this.conditionData = [];
            this.isHightLight = false;
            this.conditionHeader = "";

            //存入文件
            setConfig(newData)
              .then((res) => {
                let data = res.data;
                if (!data.errCode) {
                  this.tableData = data;

                  this.$XModal.alert({
                    content: "删除缺陷数据成功！",
                    status: "success",
                  });

                  setTimeout(() => {
                    this.isHightLight = true;
                  }, 0);
                }
              })
              .catch((err) => {
                this.$message.error("请求失败!" + err);
              });
          }
        });
      } else {
        this.$XModal.message({
          content: "请至少选择一条数据",
          status: "error",
        });
      }
    },
    //缺陷类型表格中操作的编辑按钮
    editDefectRow(row) {
      this.defectFormData = {
        defectName: row.defect_name,
        defectPriority: row.defect_priority,
        defectCode: row.defect_code,
        defectGrade: row.defect_grade,
        defectType: row.defect_type,
        defectIsEnable: row.defect_isEnable === 0 ? false : true,
        defectNote: row.defect_note,
      };

      this.defectModalTitle = "缺陷 编辑&保存";
      this.showDefectModel = true;
    },
    //新增、编辑提交
    submitDefectEvent() {
      if (this.editRowIndex === "") {
        //新增
        let newObj = {
          defect_priority: Number(this.defectFormData.defectPriority),
          defect_code: this.defectFormData.defectCode,
          defect_name: this.defectFormData.defectName,
          defect_grade: this.defectFormData.defectGrade,
          defect_type: Number(this.defectFormData.defectType),
          defect_isEnable: this.defectFormData.defectIsEnable ? 1 : 0,
          defect_note: this.defectFormData.defectNote,
          defect_class_condition: [],
        };

        let newData = JSON.parse(JSON.stringify(this.tableData));

        newData.unshift(newObj);

        newData.forEach((item, index) => {
          item._XID = index;
          item.newIndex = index;
        });

        //新增过后需要重置缺陷条件表格
        this.conditionIsDisabled = true;
        this.conditionData = [];
        this.isHightLight = false;
        this.conditionHeader = "";

        //把修改后的数据存入文件中
        setConfig(newData)
          .then((res) => {
            let data = res.data;
            if (!data.errCode) {
              this.tableData = data;

              this.$XModal.alert({
                content: "新增缺陷数据成功！",
                status: "success",
              });

              this.showDefectModel = false;
              // this.isHightLight = true;

              setTimeout(() => {
                this.isHightLight = true;
              }, 0);
            }
          })
          .catch((err) => {
            this.$message.error("请求失败!" + err);
          });
      } else {
        //编辑
        let newEditData = JSON.parse(JSON.stringify(this.tableData));

        //编辑的值从新赋值
        newEditData[this.editRowIndex].defect_priority = Number(
          this.defectFormData.defectPriority
        );
        newEditData[this.editRowIndex].defect_code =
          this.defectFormData.defectCode;
        newEditData[this.editRowIndex].defect_name =
          this.defectFormData.defectName;
        newEditData[this.editRowIndex].defect_grade =
          this.defectFormData.defectGrade;
        newEditData[this.editRowIndex].defect_type = Number(
          this.defectFormData.defectType
        );
        newEditData[this.editRowIndex].defect_isEnable = this.defectFormData
          .defectIsEnable
          ? 1
          : 0;
        newEditData[this.editRowIndex].defect_note =
          this.defectFormData.defectNote;

        //赋值_XID
        newEditData.forEach((item, index) => {
          item._XID = index;
          item.newIndex = index;
        });

        //存入文件
        setConfig(newEditData)
          .then((res) => {
            let data = res.data;
            if (!data.errCode) {
              this.tableData = data;

              this.$XModal.alert({
                content: "修改缺陷数据成功！",
                status: "success",
              });

              this.showDefectModel = false;
            }
          })
          .catch((err) => {
            this.$message.error("请求失败!" + err);
          });
      }
    },
    //缺陷类型单元格被点击后
    defectCellClick(row) {
      // console.log(row);
      this.conditionIsDisabled = false;

      this.editRowIndex = row.rowIndex;
      this.defectRowIndex = row.rowIndex;

      this.conditionHeader = `(序号：${row.rowIndex + 1},缺陷名称：${
        row.row.defect_name
      })`;

      this.conditionData = row.row.defect_class_condition;
    },

    //缺陷对应的条件表格新增
    insertCondition() {
      this.xModalTitle = "新增&保存";
      this.widthShow = false;
      this.heightShow = false;
      this.areaShow = false;
      this.grayShow = false;
      this.degreeShow = false;
      this.tierShow = false;
      this.measureShow = false;
      this.stepShow = false;
      this.conditionEditRow = "";

      //清空form数据
      this.formData = {
        conditionName: "",
        conditionIndex: "",
        conditionIsEnable: false,
        conditionImage: "",
        widthMin: 0,
        widthMax: 0,
        widthIsEnable: false,
        heightMin: 0,
        heightMax: 0,
        heightIsEnable: false,
        areaMin: 0,
        areaMax: 0,
        areaIsEnable: false,
        grayMin: 0,
        grayMax: 0,
        grayIsEnable: false,
        degreeMin: 0,
        degreeMax: 0,
        degreeIsEnable: false,
        tierNums: 0,
        tierIsEnable: false,
        measureNums: 0,
        measureIsEnable: false,
        stepName: "",
        stepIsEnable: false,
      };

      this.showEdit = true;
    },
    //缺陷对应的条件表格移除按钮
    removeCondition() {
      const $table = this.$refs.conditionTable;
      const selectRecords = $table.getCheckboxRecords();
      if (selectRecords.length) {
        this.$XModal.confirm("您确定要删除选中的数据吗?").then((type) => {
          if (type === "confirm") {
            let newData = JSON.parse(JSON.stringify(this.conditionData));
            //将要删除的索引进行获取
            let indexs = [];
            selectRecords.forEach((item) => {
              indexs.push(item.newIndex);
            });
            //倒序排序
            indexs.sort(function (a, b) {
              return b - a;
            });
            //删除选中的数据
            indexs.forEach(function (index) {
              newData.splice(index, 1);
            });

            //赋值_XID
            newData.forEach((item, index) => {
              item._XID = index;
              item.newIndex = index;
            });

            let newTableData = JSON.parse(JSON.stringify(this.tableData));

            newTableData[this.defectRowIndex].defect_class_condition = newData;

            //存入文件
            setConfig(newTableData)
              .then((res) => {
                let data = res.data;
                if (!data.errCode) {
                  this.tableData = data;

                  this.conditionData =
                    data[this.defectRowIndex].defect_class_condition;

                  this.$XModal.alert({
                    content: "删除缺陷条件数据成功！",
                    status: "success",
                  });
                }
              })
              .catch((err) => {
                this.$message.error("请求失败!" + err);
              });
          }
        });
      } else {
        this.$XModal.message({
          content: "请至少选择一条数据",
          status: "error",
        });
      }
    },
    //缺陷对应的条件表格中操作的编辑按钮
    editCondition(row) {
      this.xModalTitle = "编辑&保存";
      this.widthShow = false;
      this.heightShow = false;
      this.areaShow = false;
      this.grayShow = false;
      this.degreeShow = false;
      this.tierShow = false;
      this.measureShow = false;
      this.stepShow = false;

      //清空form数据
      this.formData = {
        conditionName: "",
        conditionIndex: "",
        conditionIsEnable: false,
        conditionImage: "",
        widthMin: 0,
        widthMax: 0,
        widthIsEnable: false,
        heightMin: 0,
        heightMax: 0,
        heightIsEnable: false,
        areaMin: 0,
        areaMax: 0,
        areaIsEnable: false,
        grayMin: 0,
        grayMax: 0,
        grayIsEnable: false,
        degreeMin: 0,
        degreeMax: 0,
        degreeIsEnable: false,
        tierNums: 0,
        tierIsEnable: false,
        measureNums: 0,
        measureIsEnable: false,
        stepName: "",
        stepIsEnable: false,
      };

      //赋值主要参数信息
      this.formData.conditionName = row.condition_name;
      this.formData.conditionIndex = row.condition_index;
      this.formData.conditionIsEnable =
        row.condition_isEnable === 0 ? false : true;
      this.formData.conditionImage = row.condition_image;

      row.condition_attribute.forEach((item) => {
        //缺陷宽度
        if (item.attribute_name === "width") {
          this.widthShow = true;
          this.formData.widthMin = item.attribute_min;
          this.formData.widthMax = item.attribute_max;
          this.formData.widthIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //缺陷高度
        if (item.attribute_name === "height") {
          this.heightShow = true;
          this.formData.heightMin = item.attribute_min;
          this.formData.heightMax = item.attribute_max;
          this.formData.heightIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //缺陷面积
        if (item.attribute_name === "area") {
          this.areaShow = true;
          this.formData.areaMin = item.attribute_min;
          this.formData.areaMax = item.attribute_max;
          this.formData.areaIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //缺陷灰度
        if (item.attribute_name === "grayScale") {
          this.grayShow = true;
          this.formData.grayMin = item.attribute_min;
          this.formData.grayMax = item.attribute_max;
          this.formData.grayIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //缺陷明显程度
        if (item.attribute_name === "degree") {
          this.degreeShow = true;
          this.formData.degreeMin = item.attribute_min;
          this.formData.degreeMax = item.attribute_max;
          this.formData.degreeIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //缺陷层级
        if (item.attribute_name === "tier") {
          this.tierShow = true;
          this.formData.tierNums = item.attribute_value;
          this.formData.tierIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //缺陷层级
        if (item.attribute_name === "measure") {
          this.measureShow = true;
          this.formData.measureNums = item.attribute_value;
          this.formData.measureIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }

        //stepName
        if (item.attribute_name === "stepName") {
          this.stepShow = true;
          this.formData.stepName = item.attribute_value;
          this.formData.stepIsEnable =
            item.attribute_isEnable === 0 ? false : true;
        }
      });

      this.showEdit = true;
    },
    //保存提交
    submitEvent() {
      let newObj = {
        condition_name: this.formData.conditionName,
        condition_index: Number(this.formData.conditionIndex),
        condition_isEnable: this.formData.conditionIsEnable ? 1 : 0,
        condition_image: this.formData.conditionImage,
        condition_attribute: [],
      };

      if (newObj.condition_image.length === 0) {
        this.$message.info("请选择至少一个检测画面!");
        return;
      }

      //判断有没有缺陷宽度属性
      if (this.widthShow) {
        let obj = {
          attribute_name: "width",
          attribute_min: Number(this.formData.widthMin),
          attribute_max: Number(this.formData.widthMax),
          attribute_isEnable: this.formData.widthIsEnable ? 1 : 0,
          attribute_type: "range",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有缺陷高度属性
      if (this.heightShow) {
        let obj = {
          attribute_name: "height",
          attribute_min: Number(this.formData.heightMin),
          attribute_max: Number(this.formData.heightMax),
          attribute_isEnable: this.formData.heightIsEnable ? 1 : 0,
          attribute_type: "range",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有缺陷面积属性
      if (this.areaShow) {
        let obj = {
          attribute_name: "area",
          attribute_min: Number(this.formData.areaMin),
          attribute_max: Number(this.formData.areaMax),
          attribute_isEnable: this.formData.areaIsEnable ? 1 : 0,
          attribute_type: "range",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有缺陷灰度属性
      if (this.grayShow) {
        let obj = {
          attribute_name: "grayScale",
          attribute_min: Number(this.formData.grayMin),
          attribute_max: Number(this.formData.grayMax),
          attribute_isEnable: this.formData.grayIsEnable ? 1 : 0,
          attribute_type: "range",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有缺陷明显程度属性
      if (this.degreeShow) {
        let obj = {
          attribute_name: "degree",
          attribute_min: Number(this.formData.degreeMin),
          attribute_max: Number(this.formData.degreeMax),
          attribute_isEnable: this.formData.degreeIsEnable ? 1 : 0,
          attribute_type: "range",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有缺陷层级属性
      if (this.tierShow) {
        let obj = {
          attribute_name: "tier",
          attribute_value: Number(this.formData.tierNums),
          attribute_isEnable: this.formData.tierIsEnable ? 1 : 0,
          attribute_type: "number",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有算法尺度属性
      if (this.measureShow) {
        let obj = {
          attribute_name: "measure",
          attribute_value: Number(this.formData.measureNums),
          attribute_isEnable: this.formData.measureIsEnable ? 1 : 0,
          attribute_type: "number",
        };
        newObj.condition_attribute.push(obj);
      }

      //判断有没有stepName属性
      if (this.stepShow) {
        let obj = {
          attribute_name: "stepName",
          attribute_value: this.formData.stepName,
          attribute_isEnable: this.formData.stepIsEnable ? 1 : 0,
          attribute_type: "string",
        };
        newObj.condition_attribute.push(obj);
      }
      let newCondition = JSON.parse(JSON.stringify(this.conditionData));
      let newTableData = JSON.parse(JSON.stringify(this.tableData));

      //判断是新增还是编辑，新增前增加，编辑替换索引的数组值
      if (this.conditionEditRow === "") {
        //新增
        newCondition.unshift(newObj);
      } else {
        //编辑
        newCondition[this.conditionEditRow] = newObj;
      }

      newCondition.forEach((item, index) => {
        item._XID = index;
        item.newIndex = index;
      });
      newTableData[this.defectRowIndex].defect_class_condition = newCondition;

      setConfig(newTableData)
        .then((res) => {
          let data = res.data;
          if (!data.errCode) {
            this.tableData = data;

            this.conditionData =
              data[this.defectRowIndex].defect_class_condition;

            let text =
              this.conditionEditRow === ""
                ? "新增缺陷条件成功！"
                : "修改缺陷条件成功！";

            this.$XModal.alert({
              content: text,
              status: "success",
            });

            this.showEdit = false;
          }
        })
        .catch((err) => {
          this.$message.error("请求失败!" + err);
        });
    },
    //条件表格被点击
    conditionCellClick(row) {
      this.conditionEditRow = row.rowIndex;
    },

    closeWidow() {
      killBrowser({}).then().catch();
    },
  },
};
</script>

<style lang="less" scoped>
.defectClass-body {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  position: relative;
  .defect-info {
    flex: 1;
    margin-right: 10px;

    .xTable-content {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
  }
  .defect-condition {
    flex: 1;
    .condition-content {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
  }
}
.query-card-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 0 10px 10px 10px;
}

.public-formItem {
  display: flex;
  justify-items: center;
  align-items: center;
  div {
    flex: 1;
  }
}
</style>
<style lang="less">
.vxe-default-input {
  color: #000 !important;
}
.vxe-body--expanded-cell {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  div {
    flex: 1;
    margin: 10px;
  }
}
.sortable-row-demo .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-row-demo .vxe-body--row.sortable-ghost,
.sortable-row-demo .vxe-body--row.sortable-chosen {
  background-color: rgb(35, 44, 49);
}
</style>