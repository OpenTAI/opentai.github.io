---
title: Leaderboards
blocks:
  - titleen: Adversarial Robustness Leaderboards
    titlezh: 对抗鲁棒性排行榜
    subtitleen: >-
      Black-box and white-box evaluations: conducted for the top 10 most
      downloaded/cited models across five popular vision tasks, using both
      domain-specific datasets and our CC1M-Adv-C/F benchmarks.
    subtitlezh: OpenTAI Rank is exploring中文
    buttonTexten: Learn how it works
    buttonTextzh: 了解评测细节
    table1:
      tab1en: Black-box
      tab1zh: 黑盒
      columnName1: Model Name
      columnName2: Link
      columnName3: Downloads
      columnName4: Adversarial Safety
      columnName4A: Domain Dataset
      columnName4B: CC1M-Adv
      columnName5: Rank
      modelsRanking1:
        - titlezh: Image Classification
          titleen: Image Classification - ImageNet
          rankings:
            - nameen: coatnet_rmlp_nano_rw_384.sw_in1k
              namezh: coatnet_rmlp_nano_rw_384.sw_in1k
              paper:
                text: >-
                  https://huggingface.co/timm/coatnet_rmlp_2_rw_384.sw_in12k_ft_in1k
                link: >-
                  https://huggingface.co/timm/coatnet_rmlp_2_rw_384.sw_in12k_ft_in1k
              download: 764
              datasetA: 67.49%
              datasetB: 31.58%
              ranking: '1'
            - nameen: coatnet_rmlp_nano_rw_224.sw_in1k
              namezh: GPT-4Test
              paper:
                text: 'https://huggingface.co/timm/coatnet_rmlp_nano_rw_224.sw_in1k'
                link: 'https://huggingface.co/timm/coatnet_rmlp_nano_rw_224.sw_in1k'
              download: 467
              datasetA: 52.75%
              datasetB: 29.14%
              ranking: '2'
            - nameen: davit_base.msft_in1k
              namezh: davit_base.msft_in1k
              paper:
                text: 'https://huggingface.co/timm/davit_base.msft_in1k'
                link: 'https://huggingface.co/timm/davit_base.msft_in1k'
              download: 1720
              datasetA: 83.25%
              datasetB: 38.06%
              ranking: '3'
            - nameen: resnet50.a1_in1k
              namezh: resnet50.a1_in1k
              paper:
                text: 'https://huggingface.co/timm/resnet50.a1_in1k'
                link: 'https://huggingface.co/timm/resnet50.a1_in1k'
              download: 9271420
              datasetA: 35.09%
              datasetB: 14.61%
              ranking: '4'
            - nameen: vit_small_patch16_224.augreg_in21k_ft_in1k
              namezh: vit_small_patch16_224.augreg_in21k_ft_in1k
              paper:
                text: >-
                  https://huggingface.co/timm/vit_base_patch16_224.augreg2_in21k_ft_in1k
                link: >-
                  https://huggingface.co/timm/vit_base_patch16_224.augreg2_in21k_ft_in1k
              download: 546023
              datasetA: 32.62%
              datasetB: 27.21%
              ranking: '5'
            - nameen: resnet18.a1_in1k
              namezh: resnet18.a1_in1k
              paper:
                text: 'https://huggingface.co/timm/resnet18.a1_in1k'
                link: 'https://huggingface.co/timm/resnet18.a1_in1k'
              download: 872296
              datasetA: 27.11%
              datasetB: 14.91%
              ranking: '6'
            - nameen: resnet18.fb_swsl_ig1b_ft_in1k
              namezh: resnet18.fb_swsl_ig1b_ft_in1k
              paper:
                text: 'https://huggingface.co/timm/resnet18.fb_swsl_ig1b_ft_in1k'
                link: 'https://huggingface.co/timm/resnet18.fb_swsl_ig1b_ft_in1k'
              download: 207942
              datasetA: 24.59%
              datasetB: 12.14%
              ranking: '7'
            - nameen: mobilenetv3_large_100.ra_in1k
              namezh: mobilenetv3_large_100.ra_in1k
              paper:
                text: 'https://huggingface.co/timm/mobilenetv3_large_100.ra_in1k'
                link: 'https://huggingface.co/timm/mobilenetv3_large_100.ra_in1k'
              download: 408002
              datasetA: 23.82%
              datasetB: 12.28%
              ranking: '8'
            - nameen: efficientnet_b3.ra2_in1k
              namezh: efficientnet_b3.ra2_in1k
              paper:
                text: 'https://huggingface.co/timm/efficientnet_b3.ra2_in1k'
                link: 'https://huggingface.co/timm/efficientnet_b3.ra2_in1k'
              download: 2391229
              datasetA: 11.30%
              datasetB: 8.18%
              ranking: '9'
            - nameen: tf_mobilenetv3_small_minimal_100.in1k
              namezh: tf_mobilenetv3_small_minimal_100.in1k
              paper:
                text: >-
                  https://huggingface.co/timm/tf_mobilenetv3_large_minimal_100.in1k
                link: >-
                  https://huggingface.co/timm/tf_mobilenetv3_large_minimal_100.in1k
              download: 783520
              datasetA: 8.99%
              datasetB: 24.83%
              ranking: '10'
        - titlezh: 目标检测
          titleen: Object Detection - COCO
          rankings:
            - nameen: atss_swin-l-p4-w12_fpn_dyhead_mstrain_2x_coco
              namezh: atss_swin-l-p4-w12_fpn_dyhead_mstrain_2x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/DyHead?athId=b19bf998702a943f70e46d53b1054e51&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/DyHead?athId=b19bf998702a943f70e46d53b1054e51&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 646
              datasetA: '0.447'
              datasetB: '0.6943'
              ranking: '1'
            - nameen: yolox_x_8x8_300e_coco
              namezh: yolox_x_8x8_300e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLOX?athId=e0fd346d0ae014efd2de972e6df9dea8&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLOX?athId=e0fd346d0ae014efd2de972e6df9dea8&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 5152
              datasetA: '0.426'
              datasetB: '0.7675'
              ranking: '2'
            - nameen: deformable-detr(deformable_detr_refine_r50_16x2_50e_coco)
              namezh: deformable-detr(deformable_detr_refine_r50_16x2_50e_coco)
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20DETR?athId=45f3fa81f746aef44a5b0eb2eacb16c1&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20DETR?athId=45f3fa81f746aef44a5b0eb2eacb16c1&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 6510
              datasetA: '0.286'
              datasetB: '0.6812'
              ranking: '3'
            - nameen: faster_rcnn_x101_64x4d_fpn_1x_coco
              namezh: faster_rcnn_x101_64x4d_fpn_1x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Faster%20R-CNN?athId=6e1c4a83606f2a559343d2c69c93d10f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Faster%20R-CNN?athId=6e1c4a83606f2a559343d2c69c93d10f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 50486
              datasetA: '0.28'
              datasetB: '0.7185'
              ranking: '4'
            - nameen: deformable_detr_r50_16x2_50e_coco
              namezh: deformable_detr_r50_16x2_50e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20DETR?athId=45f3fa81f746aef44a5b0eb2eacb16c1&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20DETR?athId=45f3fa81f746aef44a5b0eb2eacb16c1&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 5414
              datasetA: '0.276'
              datasetB: '0.6627'
              ranking: '5'
            - nameen: cascade_mask_rcnn_r50_fpn_20e_coco
              namezh: cascade_mask_rcnn_r50_fpn_20e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 1505
              datasetA: '0.257'
              datasetB: '0.7193'
              ranking: '6'
            - nameen: gfl_r50_fpn_1x_coco
              namezh: gfl_r50_fpn_1x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Generalized%20Focal%20Loss?athId=d5b8ec1f0fa4ca080d1be245181c200d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Generalized%20Focal%20Loss?athId=d5b8ec1f0fa4ca080d1be245181c200d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 1190
              datasetA: '0.246'
              datasetB: '0.6724'
              ranking: '7'
            - nameen: detr-resnet-50(detr_r50_8x2_150e_coco)
              namezh: detr-resnet-50(detr_r50_8x2_150e_coco)
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/DETR?athId=b609e23c7b56f32054cf4a85c0ef9c01&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/DETR?athId=b609e23c7b56f32054cf4a85c0ef9c01&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 566289
              datasetA: '0.241'
              datasetB: '0.6384'
              ranking: '8'
            - nameen: faster_rcnn_r50_caffe_c4_1x_coco
              namezh: faster_rcnn_r50_caffe_c4_1x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Faster%20R-CNN?athId=6e1c4a83606f2a559343d2c69c93d10f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Faster%20R-CNN?athId=6e1c4a83606f2a559343d2c69c93d10f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 50486
              datasetA: '0.214'
              datasetB: '0.6946'
              ranking: '9'
            - nameen: yolox_tiny_8x8_300e_coco
              namezh: yolox_tiny_8x8_300e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLOX?athId=e0fd346d0ae014efd2de972e6df9dea8&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLOX?athId=e0fd346d0ae014efd2de972e6df9dea8&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection
              download: 5152
              datasetA: '0.182'
              datasetB: '0.6965'
              ranking: '10'
        - titlezh: 实例分割
          titleen: Instance Segmentation - COCO
          rankings:
            - nameen: htc_x101_64x4d_fpn_dconv_c3-c5_mstrain_400_1400_16x1_20e_coco
              namezh: htc_x101_64x4d_fpn_dconv_c3-c5_mstrain_400_1400_16x1_20e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/HTC?athId=b42170f82908262275e7328643dcdb2f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/HTC?athId=b42170f82908262275e7328643dcdb2f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 1559
              datasetA: '0.334'
              datasetB: '0.6576'
              ranking: '1'
            - nameen: >-
                cascade_mask_rcnn_convnext-s_p4_w7_fpn_giou_4conv1f_fp16_ms-crop_3x_coco
              namezh: >-
                cascade_mask_rcnn_convnext-s_p4_w7_fpn_giou_4conv1f_fp16_ms-crop_3x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 1505
              datasetA: '0.332'
              datasetB: '0.6814'
              ranking: '2'
            - nameen: scnet_x101_64x4d_fpn_20e_coco
              namezh: scnet_x101_64x4d_fpn_20e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/SCNet?athId=17226ceb499bc933e2b73dd6633bbc2d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/SCNet?athId=17226ceb499bc933e2b73dd6633bbc2d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 90
              datasetA: '0.297'
              datasetB: '0.6143'
              ranking: '3'
            - nameen: cascade_mask_rcnn_x101_32x4d_fpn_dconv_c3-c5_1x_coco
              namezh: cascade_mask_rcnn_x101_32x4d_fpn_dconv_c3-c5_1x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20Convolutional%20Networks?athId=4aefab1107c2b0c71c3c091cc39b721d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20Convolutional%20Networks?athId=4aefab1107c2b0c71c3c091cc39b721d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 1505
              datasetA: '0.287'
              datasetB: '0.6733'
              ranking: '4'
            - nameen: cascade_mask_rcnn_x101_64x4d_fpn_mstrain_3x_coco
              namezh: cascade_mask_rcnn_x101_64x4d_fpn_mstrain_3x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 1505
              datasetA: '0.264'
              datasetB: '0.6536'
              ranking: '5'
            - nameen: cascade_mask_rcnn_r50_fpn_dconv_c3-c5_1x_coco
              namezh: cascade_mask_rcnn_r50_fpn_dconv_c3-c5_1x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20Convolutional%20Networks?athId=4aefab1107c2b0c71c3c091cc39b721d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20Convolutional%20Networks?athId=4aefab1107c2b0c71c3c091cc39b721d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 1505
              datasetA: '0.26'
              datasetB: '0.6541'
              ranking: '6'
            - nameen: rfnext_search_cascade_mask_rcnn_hrnetv2p_w18_20e_coco
              namezh: rfnext_search_cascade_mask_rcnn_hrnetv2p_w18_20e_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/RF-Next?athId=e99ac3889efff20e6fe2e8ac4ed9bc25&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/RF-Next?athId=e99ac3889efff20e6fe2e8ac4ed9bc25&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 37
              datasetA: '0.236'
              datasetB: '0.6474'
              ranking: '7'
            - nameen: cascade_mask_rcnn_r50_caffe_fpn_1x_coco
              namezh: cascade_mask_rcnn_r50_caffe_fpn_1x_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 1505
              datasetA: '0.219'
              datasetB: '0.6275'
              ranking: '8'
            - nameen: yolact_r101_1x8_coco
              namezh: yolact_r101_1x8_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLACT?athId=1c39dd15015b6452c3f753766ddb5278&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLACT?athId=1c39dd15015b6452c3f753766ddb5278&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 2569
              datasetA: '0.201'
              datasetB: '0.6253'
              ranking: '9'
            - nameen: yolact_r50_8x8_coco
              namezh: yolact_r50_8x8_coco
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLACT?athId=1c39dd15015b6452c3f753766ddb5278&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmdetection/YOLACT?athId=1c39dd15015b6452c3f753766ddb5278&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation
              download: 2569
              datasetA: '0.178'
              datasetB: '0.6045'
              ranking: '10'
        - titlezh: 语义分割
          titleen: Semantic Segmentation - ADE20K
          rankings:
            - nameen: knet_s3_upernet_swin-l_8x2_512x512_adamw_80k_ade20k
              namezh: knet_s3_upernet_swin-l_8x2_512x512_adamw_80k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/KNet?athId=36dcc0bba02bb32f43af76a927e050cf&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/KNet?athId=36dcc0bba02bb32f43af76a927e050cf&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 343
              datasetA: '42.31'
              datasetB: '0.6286'
              ranking: '1'
            - nameen: >-
                upernet_swin_large_patch4_window12_512x512_pretrain_384x384_22K_160k_ade20k
              namezh: >-
                upernet_swin_large_patch4_window12_512x512_pretrain_384x384_22K_160k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/UPerNet?athId=6eedb26553f6ddb295adee667149f722&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/UPerNet?athId=6eedb26553f6ddb295adee667149f722&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 1967
              datasetA: '40.35'
              datasetB: '0.5528'
              ranking: '2'
            - nameen: segformer_mit-b4_512x512_160k_ade20k
              namezh: segformer_mit-b4_512x512_160k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/Segformer?athId=94937aa281ea263f6484a359dfa3ec4b&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/Segformer?athId=94937aa281ea263f6484a359dfa3ec4b&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 4600
              datasetA: '36.88'
              datasetB: '0.4756'
              ranking: '3'
            - nameen: setr_mla_512x512_160k_b16_ade20k
              namezh: setr_mla_512x512_160k_b16_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/SETR?athId=a0088b8a1527ee3e20b6241c2b66b496&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/SETR?athId=a0088b8a1527ee3e20b6241c2b66b496&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 3437
              datasetA: '36.67'
              datasetB: '0.5365'
              ranking: '4'
            - nameen: twins_svt-b_fpn_fpnhead_8x4_512x512_80k_ade20k
              namezh: twins_svt-b_fpn_fpnhead_8x4_512x512_80k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/FPN?athId=7f617fa591d3dfd31fb2a9a7cc0ae8ba&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/FPN?athId=7f617fa591d3dfd31fb2a9a7cc0ae8ba&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 1503
              datasetA: '31.82'
              datasetB: '0.5073'
              ranking: '5'
            - nameen: dpt_vit-b16_512x512_160k_ade20k
              namezh: dpt_vit-b16_512x512_160k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/DPT?athId=b2c699d0fddf59a4e952cecea08b1b8b&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/DPT?athId=b2c699d0fddf59a4e952cecea08b1b8b&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 1813
              datasetA: '30.61'
              datasetB: '0.4642'
              ranking: '6'
            - nameen: deeplabv3_r101-d8_512x512_160k_ade20k
              namezh: deeplabv3_r101-d8_512x512_160k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/DeepLabV3?athId=6f315fcddecd0407b37cae1346078876&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/DeepLabV3?athId=6f315fcddecd0407b37cae1346078876&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 11112
              datasetA: '30.4'
              datasetB: '0.4265'
              ranking: '7'
            - nameen: fcn_hr48_512x512_160k_ade20k
              namezh: fcn_hr48_512x512_160k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/FCN?athId=9cb4ee8cc5fee1e37d4418259aa76d81&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/FCN?athId=9cb4ee8cc5fee1e37d4418259aa76d81&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 52662
              datasetA: '27.4'
              datasetB: '0.4143'
              ranking: '8'
            - nameen: dnl_r50-d8_4xb4-160k_ade20k-512x512
              namezh: dnl_r50-d8_4xb4-160k_ade20k-512x512
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/DNLNet?athId=e7a94769be0d3a1b41a6e067db8e0f5d&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/DNLNet?athId=e7a94769be0d3a1b41a6e067db8e0f5d&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 375
              datasetA: '26.3'
              datasetB: '0.4419'
              ranking: '9'
            - nameen: segmenter_vit-b_mask_8x1_512x512_160k_ade20k
              namezh: segmenter_vit-b_mask_8x1_512x512_160k_ade20k
              paper:
                text: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/Segmenter?athId=0a8f2e1dccdce40c26a35ebe5b074f36&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
                link: >-
                  https://platform.openmmlab.com/modelzoo/mmsegmentation/Segmenter?athId=0a8f2e1dccdce40c26a35ebe5b074f36&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation
              download: 1845
              datasetA: '22.29'
              datasetB: '0.6068'
              ranking: '10'
        - titlezh: 医学图像分类
          titleen: Medical Image Classification - CheXpert
          rankings:
            - nameen: CheXpert-5-convnextv2-tiny-384
              namezh: CheXpert-5-convnextv2-tiny-384
              paper:
                text: 'https://huggingface.co/shreydan/CheXpert-5-convnextv2-tiny-384'
                link: 'https://huggingface.co/shreydan/CheXpert-5-convnextv2-tiny-384'
              download: 14
              datasetA: 67.04%
              datasetB: 56.60%
              ranking: '1'
            - nameen: vit_small_patch16_224.medmae_CXR_mae_ft_CheXpert
              namezh: vit_small_patch16_224.medmae_CXR_mae_ft_CheXpert
              paper:
                text: >-
                  https://huggingface.co/1aurent/vit_small_patch16_224.medmae_CXR_mae_ft_CheXpert
                link: >-
                  https://huggingface.co/1aurent/vit_small_patch16_224.medmae_CXR_mae_ft_CheXpert
              download: 2
              datasetA: 66.92%
              datasetB: 89.74%
              ranking: '2'
            - nameen: vit_base_patch16_224.medmae_CXR_mae_ft_CheXpert
              namezh: vit_base_patch16_224.medmae_CXR_mae_ft_CheXpert
              paper:
                text: >-
                  https://huggingface.co/1aurent/vit_base_patch16_224.medmae_CXR_mae_ft_CheXpert/tree/main
                link: >-
                  https://huggingface.co/1aurent/vit_base_patch16_224.medmae_CXR_mae_ft_CheXpert/tree/main
              download: 4
              datasetA: 57.58%
              datasetB: 89.39%
              ranking: '3'
    table2:
      tab2en: White-box
      tab2zh: 白盒
      columnName1: Model Name
      columnName2: Paper
      columnName3: Citations
      columnName4: Evaluation Result
      columnName4A: Clean Acc
      columnName4B: Robust Acc
      columnName5: Rank
      modelsRanking2:
        - titlezh: CIFAR-10
          titleen: CIFAR-10
          rankings:
            - nameen: RaWideResNet-70-16
              namezh: RaWideResNet-70-16
              paper:
                text: >-
                  Robust Principles: Architectural Design Principles for
                  Adversarially Robust CNNs
                link: 'https://arxiv.org/abs/2308.16258'
              download: 38
              datasetA: 93.27%
              datasetB: 71.10%
              ranking: '1'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: Better Diffusion Models Further Improve Adversarial Training
                link: 'https://arxiv.org/abs/2302.04638'
              download: 194
              datasetA: 93.25%
              datasetB: 70.70%
              ranking: '2'
            - nameen: ResNet-152 + WideResNet-70-16 + mixing network
              namezh: ResNet-152 + WideResNet-70-16 + mixing network
              paper:
                text: >-
                  Improving the Accuracy-Robustness Trade-off of Classifiers via
                  Adaptive Smoothing
                link: 'https://arxiv.org/abs/2301.12554'
              download: 13
              datasetA: 95.23%
              datasetB: 68.06%
              ranking: '3'
            - nameen: WideResNet-28-10
              namezh: WideResNet-28-10
              paper:
                text: Decoupled Kullback-Leibler Divergence Loss
                link: 'https://arxiv.org/abs/2305.13948'
              download: 34
              datasetA: 92.16%
              datasetB: 67.75%
              ranking: '4'
            - nameen: WideResNet-28-10
              namezh: WideResNet-28-10
              paper:
                text: Better Diffusion Models Further Improve Adversarial Training
                link: 'https://arxiv.org/abs/2305.13948'
              download: 194
              datasetA: 92.44%
              datasetB: 67.31%
              ranking: '5'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: Fixing Data Augmentation to Improve Adversarial Robustness
                link: 'https://arxiv.org/abs/2302.04638'
              download: 285
              datasetA: 92.23%
              datasetB: 66.59%
              ranking: '6'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: Improving Robustness using Generated Data
                link: 'https://arxiv.org/abs/2110.09468'
              download: 287
              datasetA: 88.74%
              datasetB: 66.14%
              ranking: '7'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: >-
                  Uncovering the Limits of Adversarial Training against
                  Norm-Bounded Adversarial Examples
                link: 'https://arxiv.org/abs/2010.03593'
              download: 345
              datasetA: 91.10%
              datasetB: 65.89%
              ranking: '8'
            - nameen: WideResNet-A4
              namezh: WideResNet-A4
              paper:
                text: >-
                  Revisiting Residual Networks for Adversarial Robustness: An
                  Architectural Perspective
                link: 'https://arxiv.org/abs/2212.11005'
              download: 38
              datasetA: 91.59%
              datasetB: 65.78%
              ranking: '9'
            - nameen: WideResNet-106-16
              namezh: WideResNet-106-16
              paper:
                text: Fixing Data Augmentation to Improve Adversarial Robustness
                link: 'https://arxiv.org/abs/2103.01946'
              download: 285
              datasetA: 88.50%
              datasetB: 64.68%
              ranking: '10'
        - titlezh: CIFAR-100
          titleen: CIFAR-100
          rankings:
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: Better Diffusion Models Further Improve Adversarial Training
                link: null
              download: 194
              datasetA: 75.23%
              datasetB: 42.83%
              ranking: '1'
            - nameen: WideResNet-28-10
              namezh: WideResNet-28-10
              paper:
                text: Decoupled Kullback-Leibler Divergence Loss
                link: null
              download: 34
              datasetA: 73.83%
              datasetB: 39.39%
              ranking: '2'
            - nameen: WideResNet-28-10
              namezh: WideResNet-28-10
              paper:
                text: Better Diffusion Models Further Improve Adversarial Training
                link: null
              download: 194
              datasetA: 72.58%
              datasetB: 38.92%
              ranking: '3'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: >-
                  Uncovering the Limits of Adversarial Training against
                  Norm-Bounded Adversarial Examples
                link: null
              download: 345
              datasetA: 69.15%
              datasetB: 37.20%
              ranking: '4'
            - nameen: XCiT-L12
              namezh: XCiT-L12
              paper:
                text: A Light Recipe to Train Robust Vision Transformers
                link: null
              download: 56
              datasetA: 70.77%
              datasetB: 35.27%
              ranking: '5'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: Fixing Data Augmentation to Improve Adversarial Robustness
                link: null
              download: 285
              datasetA: 63.56%
              datasetB: 34.74%
              ranking: '6'
            - nameen: XCiT-M12
              namezh: XCiT-M12
              paper:
                text: A Light Recipe to Train Robust Vision Transformers
                link: null
              download: 56
              datasetA: 69.20%
              datasetB: 34.33%
              ranking: '7'
            - nameen: WideResNet-70-16
              namezh: WideResNet-70-16
              paper:
                text: >-
                  Robustness and Accuracy Could Be Reconcilable by (Proper)
                  Definition
                link: null
              download: 136
              datasetA: 65.56%
              datasetB: 33.14%
              ranking: '8'
        - titlezh: ImageNet-1k
          titleen: ImageNet-1k
          rankings:
            - nameen: ConvNeXtV2-L + Swin-L
              namezh: ConvNeXtV2-L + Swin-L
              paper:
                text: >-
                  MixedNUTS: Training-Free Accuracy-Robustness Balance via
                  Nonlinearly Mixed Classifiers
                link: null
              download: 2
              datasetA: 81.10%
              datasetB: 58.65%
              ranking: '1'
            - nameen: Swin-L
              namezh: Swin-L
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 78.18%
              datasetB: 57.35%
              ranking: '2'
            - nameen: ConvNeXt-L
              namezh: ConvNeXt-L
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 77.48%
              datasetB: 56.53%
              ranking: '3'
            - nameen: ConvNeXt-L + ConvStem
              namezh: ConvNeXt-L + ConvStem
              paper:
                text: >-
                  Revisiting Adversarial Training for ImageNet: Architectures,
                  Training and Generalization across Threat Models
                link: null
              download: 48
              datasetA: 76.79%
              datasetB: 55.94%
              ranking: '4'
            - nameen: Swin-B
              namezh: Swin-B
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 76.22%
              datasetB: 54.41%
              ranking: '5'
            - nameen: ConvNeXt-B
              namezh: ConvNeXt-B
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 76.38%
              datasetB: 54.13%
              ranking: '6'
            - nameen: ConvNeXt-B + ConvStem
              namezh: ConvNeXt-B + ConvStem
              paper:
                text: >-
                  Revisiting Adversarial Training for ImageNet: Architectures,
                  Training and Generalization across Threat Models
                link: null
              download: 48
              datasetA: 75.46%
              datasetB: 53.94%
              ranking: '7'
            - nameen: ViT-B + ConvStem
              namezh: ViT-B + ConvStem
              paper:
                text: >-
                  Revisiting Adversarial Training for ImageNet: Architectures,
                  Training and Generalization across Threat Models
                link: null
              download: 48
              datasetA: 76.12%
              datasetB: 52.82%
              ranking: '8'
            - nameen: ConvNeXt-S + ConvStem
              namezh: ConvNeXt-S + ConvStem
              paper:
                text: >-
                  Revisiting Adversarial Training for ImageNet: Architectures,
                  Training and Generalization across Threat Models
                link: null
              download: 48
              datasetA: 73.37%
              datasetB: 49.74%
              ranking: '9'
            - nameen: RaWideResNet-101-2
              namezh: RaWideResNet-101-2
              paper:
                text: >-
                  Robust Principles: Architectural Design Principles for
                  Adversarially Robust CNNs
                link: null
              download: 38
              datasetA: 73.45%
              datasetB: 49.06%
              ranking: '10'
            - nameen: ConvNeXt-T + ConvStem
              namezh: ConvNeXt-T + ConvStem
              paper:
                text: >-
                  Revisiting Adversarial Training for ImageNet: Architectures,
                  Training and Generalization across Threat Models
                link: null
              download: 48
              datasetA: 72.45%
              datasetB: 47.70%
              ranking: '11'
        - titlezh: CC1M
          titleen: CC1M
          rankings:
            - nameen: ConvNeXt-L + ConvStem
              namezh: ConvNeXt-L + ConvStem
              paper:
                text: >-
                  Revisiting Adversarial Training for ImageNet: Architectures,
                  Training and Generalization across Threat Models
                link: null
              download: 48
              datasetA: 100%
              datasetB: 18.17%
              ranking: '1'
            - nameen: ConvNeXtV2-L + Swin-L
              namezh: ConvNeXtV2-L + Swin-L
              paper:
                text: >-
                  MixedNUTS: Training-Free Accuracy-Robustness Balance via
                  Nonlinearly Mixed Classifiers
                link: null
              download: 2
              datasetA: 100%
              datasetB: 17.56%
              ranking: '2'
            - nameen: Swin-L
              namezh: Swin-L
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 100%
              datasetB: 17.23%
              ranking: '3'
            - nameen: ConvNeXt-L
              namezh: ConvNeXt-L
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 100%
              datasetB: 17.13%
              ranking: '4'
            - nameen: Swin-B
              namezh: Swin-B
              paper:
                text: >-
                  A Comprehensive Study on Robustness of Image Classification
                  Models: Benchmarking and Rethinking
                link: null
              download: 57
              datasetA: 100%
              datasetB: 16.78%
              ranking: '5'
    _template: table
---

