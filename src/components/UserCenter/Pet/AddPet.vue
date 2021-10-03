<template>
  <div class="my-pets">
    <h3 class="title">添加宠物</h3>
    <div class="content">
      <el-form :model="pet" :rules="rules" ref="petFrom">
        <div class="pet-avatar" @click="uploadTrigger(0)">
          <el-avatar :size="100" :src="pet.defaultImage.image">上传宠物头像</el-avatar>
          <input
            id="fileTop"
            name="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            @change="petImageUpload"
          />
        </div>
        <div>
          <el-form-item prop="name" class="pet-info-item">
            <span class="span">
              <svg
                t="1600240377895"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="13879"
                width="18"
                height="18"
              >
                <path
                  d="M696.32 614.4h-358.4c-43.52 0-76.8 33.28-76.8 76.8v51.2c0 15.36 12.8 25.6 25.6 25.6h51.2v179.2c0 15.36 12.8 25.6 25.6 25.6h307.2c12.8 0 25.6-10.24 25.6-25.6v-179.2h51.2c12.8 0 25.6-10.24 25.6-25.6v-51.2c0-43.52-35.84-76.8-76.8-76.8z m-51.2 307.2h-256v-153.6h256v153.6z m76.8-204.8h-409.6v-25.6c0-12.8 12.8-25.6 25.6-25.6h358.4c12.8 0 25.6 12.8 25.6 25.6v25.6z m-130.56-657.92c-43.52-7.68-84.48-7.68-128-5.12-217.6 25.6-391.68 207.36-407.04 424.96-10.24 166.4 66.56 314.88 189.44 404.48a25.6 25.6 0 0 0 40.96-20.48c0-7.68-5.12-15.36-10.24-20.48-110.08-81.92-176.64-217.6-166.4-358.4 12.8-194.56 168.96-355.84 360.96-378.88 15.36-2.56 30.72-2.56 46.08-2.56 225.28 0 409.6 184.32 409.6 409.6 0 133.12-64 256-168.96 330.24-7.68 5.12-10.24 12.8-10.24 20.48 0 20.48 23.04 33.28 40.96 20.48 120.32-87.04 197.12-230.4 189.44-389.12-10.24-217.6-174.08-396.8-386.56-435.2z"
                  p-id="13880"
                  fill="#707070"
                ></path>
                <path
                  d="M824.32 512m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z"
                  p-id="13881"
                  fill="#707070"
                ></path>
                <path
                  d="M209.92 512m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z"
                  p-id="13882"
                  fill="#707070"
                ></path>
                <path
                  d="M281.6 345.6v-10.24c0-2.56 2.56-5.12 5.12-5.12 2.56-2.56 5.12-2.56 7.68-2.56h58.88c12.8 0 25.6 0 33.28 2.56 10.24 2.56 17.92 5.12 23.04 10.24s10.24 12.8 12.8 20.48 5.12 20.48 5.12 33.28-2.56 23.04-5.12 33.28-7.68 15.36-12.8 23.04-12.8 10.24-23.04 12.8c-10.24 2.56-20.48 5.12-33.28 5.12h-33.28v61.44c0 5.12-2.56 7.68-5.12 10.24s-7.68 5.12-15.36 5.12-12.8-2.56-15.36-5.12c-2.56-2.56-5.12-7.68-5.12-10.24v-184.32z m40.96 84.48h33.28c12.8 0 23.04-2.56 25.6-7.68 5.12-5.12 7.68-15.36 7.68-28.16 0-7.68 0-12.8-2.56-15.36-2.56-5.12-5.12-7.68-7.68-10.24-2.56-2.56-7.68-5.12-10.24-5.12s-7.68-2.56-12.8-2.56h-33.28v69.12zM488.96 506.88h74.24c7.68 0 12.8 0 15.36 2.56s5.12 7.68 5.12 12.8-2.56 10.24-5.12 12.8c-2.56 2.56-7.68 2.56-15.36 2.56h-94.72c-5.12 0-10.24 0-15.36-2.56-2.56-2.56-5.12-7.68-5.12-12.8v-179.2c0-5.12 2.56-10.24 5.12-12.8 2.56-2.56 7.68-2.56 15.36-2.56h94.72c5.12 0 10.24 0 12.8 5.12 2.56 2.56 5.12 7.68 5.12 12.8s-2.56 10.24-5.12 12.8c-2.56 2.56-7.68 2.56-12.8 2.56h-74.24v51.2h71.68c7.68 0 10.24 2.56 15.36 5.12 2.56 2.56 5.12 7.68 5.12 12.8s-2.56 10.24-5.12 12.8c-2.56 2.56-7.68 2.56-15.36 2.56h-71.68v61.44zM704 360.96v166.4c0 5.12-2.56 7.68-5.12 10.24s-7.68 5.12-15.36 5.12-12.8-2.56-15.36-5.12c-2.56-2.56-5.12-7.68-5.12-10.24v-166.4h-38.4c-2.56 0-7.68-2.56-10.24-5.12-2.56-2.56-5.12-7.68-5.12-12.8s2.56-10.24 5.12-12.8 7.68-5.12 10.24-5.12h117.76c5.12 0 7.68 2.56 10.24 5.12s5.12 7.68 5.12 12.8c0 7.68-2.56 10.24-5.12 12.8-2.56 2.56-7.68 5.12-10.24 5.12h-38.4z"
                  p-id="13883"
                  fill="#707070"
                ></path>
              </svg>
              昵称：
            </span>
            <el-input v-model="pet.name"></el-input>
          </el-form-item>
        </div>

        <el-form-item prop="features" class="pet-info-item">
          <span class="span">
            <svg
              t="1600239112690"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6694"
              width="16"
              height="16"
            >
              <path
                d="M906.24 256L527.36 35.84c-10.24-5.12-15.36-5.12-25.6 0L117.76 256c-5.12 5.12-10.24 15.36-10.24 25.6V716.8c0 10.24 5.12 15.36 15.36 20.48l378.88 220.16c5.12 0 10.24 5.12 10.24 5.12 5.12 0 10.24 0 15.36-5.12l378.88-220.16c10.24-5.12 15.36-15.36 15.36-20.48V281.6c-5.12-10.24-10.24-20.48-15.36-25.6z m-40.96 450.56l-353.28 204.8-353.28-204.8v-409.6l353.28-204.8 353.28 204.8v409.6z"
                p-id="6695"
                fill="#707070"
              ></path>
              <path
                d="M317.44 389.12c-5.12 10.24 0 25.6 10.24 30.72L486.4 512v209.92c0 15.36 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6v-204.8l163.84-92.16c10.24-5.12 15.36-20.48 10.24-35.84-5.12-10.24-20.48-15.36-35.84-10.24L512 471.04 353.28 378.88c-10.24-10.24-30.72-5.12-35.84 10.24z"
                p-id="6696"
                fill="#707070"
              ></path>
            </svg>
            特征：
          </span>
          <el-tag
            :key="tag"
            v-for="tag in pet.features"
            closable
            :disable-transition="false"
            @close="handleClose(tag)"
            >{{ tag }}</el-tag
          >
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            v-model="featureInputValue"
          ></el-input>
          <el-button class="button-new-tag" v-else size="small" @click="showInput">+特点</el-button>
        </el-form-item>

        <el-form-item prop="raceValue" class="pet-info-item">
          <span class="span">
            <svg
              t="1600238992483"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11965"
              width="16"
              height="16"
            >
              <path
                d="M512 18.4832C239.445333 18.4832 18.4832 239.445333 18.4832 512 18.4832 784.554667 239.445333 1005.5168 512 1005.5168c272.554667 0 493.5168-220.945067 493.5168-493.5168C1005.5168 239.445333 784.554667 18.4832 512 18.4832zM512 974.216533C256.7168 974.216533 49.783467 767.2832 49.783467 512S256.7168 49.783467 512 49.783467 974.216533 256.7168 974.216533 512 767.2832 974.216533 512 974.216533z"
                p-id="11966"
                fill="#707070"
              ></path>
              <path
                d="M362.5472 583.8336c1.536 5.461333 2.628267 11.1104 2.628267 17.066667 0 34.952533-28.330667 63.2832-63.2832 63.2832-34.952533 0-63.2832-28.330667-63.2832-63.2832 0-19.694933 9.284267-36.9664 23.3984-48.571733 0.512 0.290133 0.9728 0.648533 1.4848 0.9216L263.492267 550.912l0-20.258133 0-2.3552c-0.512 0.273067-0.9728 0.631467-1.4848 0.9216-14.114133-11.588267-23.3984-28.859733-23.3984-48.571733 0-34.952533 28.330667-63.2832 63.2832-63.2832 34.952533 0 63.2832 28.330667 63.2832 63.2832 0 5.956267-1.092267 11.605333-2.628267 17.066667l20.002133 0c1.160533-5.512533 1.809067-11.2128 1.809067-17.066667 0-45.550933-36.932267-82.4832-82.4832-82.4832s-82.4832 36.932267-82.4832 82.4832c0 23.8592 10.257067 45.141333 26.5216 60.125867-16.247467 14.967467-26.5216 36.266667-26.5216 60.125867 0 45.550933 36.932267 82.4832 82.4832 82.4832s82.4832-36.932267 82.4832-82.4832c0-5.853867-0.648533-11.554133-1.809067-17.066667L362.5472 583.8336z"
                p-id="11967"
                fill="#707070"
              ></path>
              <path
                d="M647.253333 583.8336c-1.536 5.461333-2.628267 11.1104-2.628267 17.066667 0 34.952533 28.330667 63.2832 63.2832 63.2832 34.952533 0 63.2832-28.330667 63.2832-63.2832 0-19.694933-9.284267-36.9664-23.3984-48.571733-0.512 0.290133-0.9728 0.648533-1.4848 0.9216L746.308267 550.912l0-20.258133 0-2.3552c0.512 0.273067 0.9728 0.631467 1.4848 0.9216 14.114133-11.588267 23.3984-28.859733 23.3984-48.571733 0-34.952533-28.330667-63.2832-63.2832-63.2832-34.952533 0-63.2832 28.330667-63.2832 63.2832 0 5.956267 1.092267 11.605333 2.628267 17.066667l-20.002133 0c-1.160533-5.512533-1.809067-11.2128-1.809067-17.066667 0-45.550933 36.932267-82.4832 82.4832-82.4832s82.4832 36.932267 82.4832 82.4832c0 23.8592-10.257067 45.141333-26.5216 60.125867 16.247467 14.967467 26.5216 36.266667 26.5216 60.125867 0 45.550933-36.932267 82.4832-82.4832 82.4832-45.550933 0-82.4832-36.932267-82.4832-82.4832 0-5.853867 0.648533-11.554133 1.809067-17.066667L647.253333 583.8336z"
                p-id="11968"
                fill="#707070"
              ></path>
              <path
                d="M649.6768 503.415467 360.226133 503.415467 364.9024 485.034667 644.6592 485.034667Z"
                p-id="11969"
                fill="#707070"
              ></path>
              <path
                d="M646.6048 586.257067 363.195733 586.257067 358.144 567.876267 651.963733 567.876267Z"
                p-id="11970"
                fill="#707070"
              ></path>
            </svg>
            品种：
          </span>
          <el-select style="width:150px" v-model="pet.raceValue">
            <el-option
              v-for="item in race"
              :label="item.label"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sexValue" class="pet-info-item">
          <span class="span">
            <svg
              t="1600239043553"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5094"
              width="16"
              height="16"
            >
              <path
                d="M306.623 619.695c125.358-17.375 221.908-124.92 221.908-255.05 0-142.289-115.312-257.6-257.607-257.6-142.238-0.001-257.6 115.311-257.6 257.6 0 130.13 96.544 237.675 221.961 255.05V743.72H68.45v71.228h166.835v166.886h71.286V815.002h166.828v-71.23H306.623V619.695zM84.72 364.645c0-102.93 83.334-186.262 186.204-186.262 102.93 0 186.262 83.389 186.262 186.262 0 102.875-83.333 186.262-186.262 186.262-102.87 0-186.204-83.387-186.204-186.262z m0 0M504.103 757.32c0.05 142.295 115.42 257.605 257.768 257.548 142.29-0.058 257.543-115.422 257.49-257.71-0.057-130.138-96.66-237.617-222.018-254.993l-0.11-261.378 68.123 68.175 50.411-50.411-118.644-118.532-35.698-35.642-154.064 154.226 50.41 50.359 68.176-68.235 0.116 261.38c-125.475 17.486-222.019 125.078-221.96 255.212z m443.862-0.162c0.11 102.929-83.275 186.313-186.211 186.371-102.928 0.052-186.262-83.332-186.314-186.21 0-102.87 83.276-186.26 186.204-186.313 102.878-0.11 186.263 83.277 186.32 186.152z m0 0"
                p-id="5095"
                fill="#707070"
              ></path>
            </svg>
            性别：
          </span>
          <el-select style="width:150px" v-model="pet.sexValue">
            <el-option
              v-for="item in sex"
              :label="item.label"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="isVisual" class="pet-info-item">
          <span class="span">
            <svg
              t="1600239155651"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7624"
              width="16"
              height="16"
            >
              <path
                d="M841.142857 36.571429A109.714286 109.714286 0 0 1 950.857143 146.285714v731.428572a109.714286 109.714286 0 0 1-109.714286 109.714285h-658.285714A109.714286 109.714286 0 0 1 73.142857 877.714286V146.285714A109.714286 109.714286 0 0 1 182.857143 36.571429z m0 73.142857h-658.285714A36.571429 36.571429 0 0 0 146.285714 146.285714v731.428572a36.571429 36.571429 0 0 0 36.571429 36.571428h658.285714a36.571429 36.571429 0 0 0 36.571429-36.571428V146.285714a36.571429 36.571429 0 0 0-36.571429-36.571428z m-219.428571 438.857143A109.714286 109.714286 0 0 1 731.428571 658.285714c0 60.562286-49.152 109.714286-111.835428 109.714286l-10.605714-0.731429a109.787429 109.787429 0 0 1-90.697143-72.338285L329.142857 694.857143a36.571429 36.571429 0 0 1-6.582857-72.557714L329.142857 621.714286h189.147429c15.067429-42.642286 55.661714-73.142857 103.424-73.142857z m0 73.142857A36.571429 36.571429 0 0 0 585.142857 658.285714c0 18.578286 13.970286 34.230857 30.134857 36.132572L621.714286 694.857143a36.571429 36.571429 0 0 0 0-73.142857z m-219.428572-365.714286c47.762286 0 88.356571 30.500571 103.424 73.142857H694.857143a36.571429 36.571429 0 0 1 6.582857 72.557714L694.857143 402.285714l-189.147429 0.073143a111.104 111.104 0 0 1-92.818285 72.484572L402.285714 475.428571a109.714286 109.714286 0 0 1 0-219.428571z m0 73.142857A36.571429 36.571429 0 0 0 365.714286 365.714286c0 20.187429 16.384 36.571429 34.450285 36.571428l6.436572-0.219428A36.571429 36.571429 0 0 0 402.285714 329.142857z"
                p-id="7625"
                fill="#707070"
              ></path>
            </svg>
            公开：
          </span>
          <el-select style="width:150px" v-model="pet.isVisual">
            <el-option
              v-for="item in visual"
              :label="item.label"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth" class="pet-info-item">
          <span class="span">
            <svg
              t="1600239181674"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12247"
              width="16"
              height="16"
            >
              <path
                d="M866.1 604.6c-58.6-58.6-136.5-90.9-219.4-90.9h-61.5V379.2c0-34.7-28.3-63-63-63h-23.7c-34.7 0-63 28.3-63 63v134.6h-54.8c-82.9 0-160.8 32.3-219.4 90.9-58.6 58.5-90.9 136.4-90.9 219.3v132.8h886.5V824c0-82.9-32.2-160.8-90.8-219.4zM481.9 379.2c0-9.1 7.4-16.5 16.5-16.5h23.7c9.1 0 16.5 7.4 16.5 16.5v134.6h-56.7V379.2z m405.3 507.9H140.1v-63c0-132.6 107.9-240.5 240.5-240.5h266.1c132.6 0 240.5 107.9 240.5 240.5v63zM503.8 289.2c37.6 0 58-15.7 68.6-28.9 14.1-17.6 19.3-42.1 14-65.5-2.1-9.2-8.1-25.9-36-64.9-14.5-20.2-28-36.8-28.5-37.5l-19.7-24.2L484.6 94c-0.5 0.8-13.2 19.6-26.5 40.8-25.4 40.7-29.9 53.8-31.1 61.9-1 6.8-4.7 42.1 18 68.3 9.6 11 27.6 24.2 58.8 24.2z m-30.9-85.5c2.2-7.6 16.4-31.7 32.4-56.8 17.8 24 33.5 48.3 35.7 58.1 1.7 7.5 1.3 18.3-5 26.2-6.1 7.6-16.9 11.5-32.2 11.5-16.5 0-21.9-6.2-23.6-8.2-7.2-8.3-8.3-22.7-7.3-30.8z"
                p-id="12248"
                fill="#707070"
              ></path>
            </svg>
            生日：
          </span>
          <el-date-picker
            v-model="pet.birth"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <div class="pet-info-item">
          <span class="span">
            <svg
              t="1600239245926"
              class="icon"
              viewBox="0 0 1097 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8866"
              width="16"
              height="16"
            >
              <path
                d="M365.714286 329.142857q0 45.714286-32 77.714286t-77.714286 32-77.714286-32-32-77.714286 32-77.714286 77.714286-32 77.714286 32 32 77.714286z m585.142857 219.428572v256H146.285714v-109.714286l182.857143-182.857143 91.428572 91.428571 292.571428-292.571428z m54.857143-402.285715H91.428571q-7.428571 0-12.857142 5.428572T73.142857 164.571429v694.857142q0 7.428571 5.428572 12.857143T91.428571 877.714286h914.285715q7.428571 0 12.857143-5.428572t5.428571-12.857143V164.571429q0-7.428571-5.428571-12.857143T1005.714286 146.285714z m91.428571 18.285715v694.857142q0 37.714286-26.857143 64.571429t-64.571428 26.857143H91.428571q-37.714286 0-64.571428-26.857143t-26.857143-64.571429V164.571429q0-37.714286 26.857143-64.571429t64.571428-26.857143h914.285715q37.714286 0 64.571428 26.857143t26.857143 64.571429z"
                p-id="8867"
                fill="#707070"
              ></path>
            </svg>
            照片：
          </span>
          <el-button @click="uploadTrigger(1)" class="upload-pic">
            <span class="span" style="padding:0px 40px">上传图片</span>
            <input
              v-show="false"
              id="file"
              name="file"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              @change="petImageUpload"
            />
          </el-button>
        </div>

        <ul class="app-pet-ul" style="display:flex;">
          <li class="pic-list" v-for="item in pet.image" :key="item.id">
            <div style="width:300px; height:200px">
              <i @click="delPic(item.id)" class="iconfont del-pic" font-size="100px">&#xe622;</i>
              <img :src="item.image" :alt="item.image" style="width:300px; height:200px" />
            </div>
          </li>
        </ul>
      </el-form>
      <div class="pet-info-bottom">
        <el-button type="primary" style="margin-right:20px;" @click="submitForm('petFrom')"
          >添加宠物</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      inputVisible: false,
      featureInputValue: '',
      // imagetype表示上传的图片是默认图片（0）还是图片列表（1）
      imageType: 1,
      race: [
        { value: 0, label: '猫' },
        { value: 1, label: '狗' },
        { value: 2, label: '其他' }
      ],
      sex: [
        { value: 0, label: '公' },
        { value: 1, label: '母' }
      ],
      visual: [
        { value: true, label: '是' },
        { value: false, label: '否' }
      ],
      pet: {
        raceValue: '',
        sexValue: '',
        name: '',
        defaultImage: '',
        birth: '',
        isVisual: '',
        features: ['可爱', '粘人'],
        image: []
      },
      rules: {
        name: [{ required: true, message: '请输入宠物昵称', trigger: 'blur' }],
        features: [{ required: true, message: '请输入宠物特点', trigger: 'blur' }],
        raceValue: [{ required: true, message: '请选择宠物品种', trigger: 'change' }],
        sexValue: [{ required: true, message: '请选择性别', trigger: 'change' }],
        isVisual: [{ required: true, message: '请选择是否公开', trigger: 'change' }],
        birth: [{ required: true, message: '请选择生日', trigger: 'change' }]
      }
    }
  },
  methods: {
    uploadTrigger(x) {
      console.log(x)
      this.imageType = x
      if (x === 0) {
        document.getElementById('fileTop').click()
      } else {
        document.getElementById('file').click()
      }
    },
    petImageUpload(e) {
      console.log(e)
      const file = e.target.files[0]
      const param = new FormData()
      param.append('image_hz', file)
      const headers = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.$message({
        message: '正在上传',
        type: 'info'
      })

      axios.post(this.$URL + '/v1/pet/image/create', param, headers).then(
        res => {
          console.log(res)

          if (res.status === 201) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            if (this.imageType === 0) {
              this.pet.defaultImage = { id: res.data.id, image: res.data.image_hz }
            } else {
              this.pet.image.push({ id: res.data.id, image: res.data.image_hz })
            }
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.pet.image.length !== 0) {
          console.log(this.pet.image)
          console.log(this.pet.defaultImage)
          console.log(this.pet.defaultImage.id === undefined ? 0 : this.pet.defaultImage.id)
          const data = {
            race_hz: this.pet.raceValue,
            sex_hz: this.pet.sexValue,
            name_hz: this.pet.name,
            default_image_hz: this.pet.defaultImage.id === undefined ? 0 : this.pet.defaultImage.id,
            birth_hz: this.pet.birth,
            visual_hz: this.pet.isVisual,
            features_hz: this.pet.features,
            image: this.pet.image
          }
          this.$store.dispatch('PostPet/addNewPet', data).then(
            res => {
              console.log(res)
              if (res.status === 201) {
                this.$message({
                  message: '添加宠物成功',
                  type: 'success'
                })
              }
              setTimeout(() => {
                this.$router.go(0)
              }, 500)
            },
            err => {
              console.log(err)
              this.$message({
                message: '添加宠物失败',
                type: 'errorL'
              })
            }
          )
        } else {
          this.$message({
            message: '请上传宠物照片哦',
            type: 'warning'
          })
        }
      })
    },
    delPic(imgId) {
      this.pet.image = this.pet.image.filter(obj => obj.id !== imgId)
      console.log(this.pet.image)
    },
    handleClose(tag) {
      this.pet.features.splice(this.pet.features.indexOf(tag), 1)
    },
    handleInputConfirm() {
      const inputValue = this.featureInputValue
      if (inputValue) {
        this.pet.features.push(inputValue)
      }
      this.inputVisible = false
      this.featureInputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style scoped>
.app-pet-ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.my-pets {
  height: 100%;
}
.back-icon {
  float: left;
  opacity: 0.5;
  margin-left: 20px;
}
.list-null {
  height: 300px;
  width: 100%;

  display: flex;
  justify-content: center;
  text-align: center;
}

.content {
  padding-top: 20px;
  border-top: 1px solid #f1f1f1;
  margin: 20px;
}
.pet-info-item .span {
  padding: 0px 15px;
  font-size: 17px;
  color: #4d4d4d;
}
.pet-info-item {
  /* background: #efefef; */
  /* padding: 15px; */
  display: flex;
  align-items: center;
  justify-content: left;
}

.pet-avatar {
  float: right;
  margin-top: 20px;
  margin-right: 80px;
}
i {
  margin: 0px 5px;
}
.iconfont {
  font-size: 17px;
}
.edit-info {
  padding: 7px;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  color: #3183c7;
  margin-right: 15px;
}
.el-input {
  width: 200px;
}
.upload-pic {
  background-color: #efefef;
  width: 200px;
  height: 50px;
  border-radius: 50px;
  margin-bottom: 20px;
}
.pet-info-bottom {
  margin-top: 20px;
}
.pet-info-bottom .el-button {
  width: 300px;
}

#file,
#fileTop {
  opacity: 0;
  width: 1px;
}
.pic-list {
  position: relative;
}

.pic-list:hover {
  opacity: 0.6;
  cursor: pointer;
}
.pic-list:hover .del-pic {
  opacity: 1;
}
.del-pic {
  position: absolute;
  top: 80px;
  left: 120px;
  font-size: 40px;
  opacity: 0;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  padding: 0px;
  width: 60px;
}
.input-new-tag {
  width: 80px;
  margin-left: 10px;
}
</style>
